import { BoclipsPlayer } from 'boclips-react-player';
import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../../src/app/App';
import { Constants } from '../../src/app/Constants';
import { By } from '../By';
import { findAll, findOne } from '../enzymeHelpers';
import eventually from '../eventually';
import MockFetchVerify from '../MockFetchVerify';
import { links, video177, videos } from '../video-service-responses';

jest.mock('react', () => {
  const r = jest.requireActual('react');

  return { ...r, memo: x => x };
});

export class SearchPage {
  constructor(public wrapper: ReactWrapper) {}

  public static async load(query: string) {
    const escapedQuery = encodeURIComponent(query);

    MockFetchVerify.get('/v1/', JSON.stringify(links));
    MockFetchVerify.get(`/v1/videos/${video177.id}`, JSON.stringify(video177));
    MockFetchVerify.get(
      new RegExp(`/v1/videos?.*query=${escapedQuery}`),
      JSON.stringify(videos),
    );

    const page = new SearchPage(
      mount(
        <App
          history={createMemoryHistory({
            initialEntries: [`/videos?page=1&q=${escapedQuery}`],
          })}
        />,
      ),
    );

    await page.hasLoaded();
    return page;
  }

  public static async loadNews(query: string) {
    const escapedQuery = encodeURIComponent(query);

    MockFetchVerify.get('/v1/', JSON.stringify(links));
    MockFetchVerify.get(`/v1/videos/${video177.id}`, JSON.stringify(video177));
    MockFetchVerify.get(
      new RegExp(
        `/v1/videos?.*query=${escapedQuery}?.*&include_tag=${
          Constants.CLASSROOM
        },${Constants.NEWS}`,
      ),
      JSON.stringify(videos),
    );

    const page = new SearchPage(
      mount(
        <App
          history={createMemoryHistory({
            initialEntries: [`/videos?page=1&q=${escapedQuery}&mode=news`],
          })}
        />,
      ),
    );

    await page.hasLoaded();
    return page;
  }

  public getVideoResults() {
    return findAll(this.wrapper, 'search-result').map(el => ({
      title: findOne(el, 'video-title').text(),
      description: findOne(el, 'video-description').text(),
      contentProvider: findOne(el, 'video-content-provider').text(),
      duration: findOne(el, 'video-duration').text(),
      releasedOn: findOne(el, 'video-released-on').text(),
      thumbnailUrl: el.find(BoclipsPlayer).prop('thumbnail'),
    }));
  }

  public getCount(): number {
    return parseInt(this.wrapper.find(By.dataQa('search-count')).text(), 10);
  }

  public clickOnFirstTitle() {
    this.wrapper
      .find(By.dataQa('link-to-details', 'a'))
      .first()
      .simulate('click', { button: 0 });
  }

  public async isOnDetailsPage() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      expect(this.wrapper.find(By.dataQa('video-details-title'))).toExist();
    });
  }

  private async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'search-page');
    });
  }
}
