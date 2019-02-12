import { BoclipsPlayer } from 'boclips-react-player';
import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../../src/app/App';
import { Constants } from '../../src/app/AppConstants';
import { By } from '../By';
import { findAll, findOne } from '../enzymeHelpers';
import eventually from '../eventually';
import MockFetchVerify from '../MockFetchVerify';
import {
  links,
  usersVideoCollection,
  video177,
  videos,
} from '../video-service-responses';

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
    MockFetchVerify.get(`/v1/collections/default`, usersVideoCollection);

    // TODO Move to test which needs this?
    MockFetchVerify.put(
      new RegExp(`/v1/collections/default/videos/.*`),
      JSON.stringify({}),
      204,
    );
    MockFetchVerify.destroy(
      new RegExp(`/v1/collections/default/videos/.*`),
      JSON.stringify({}),
      204,
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
        `/v1/videos?.*query=${escapedQuery}?.*&include_tag=${Constants.NEWS}`,
      ),
      JSON.stringify(videos),
    );
    MockFetchVerify.get(`/v1/collections/default`, usersVideoCollection);

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
    return findAll(this.wrapper, 'video-card').map(el => ({
      title: findOne(el, 'video-title').text(),
      description: findOne(el, 'video-description').text(),
      contentPartner: findOne(el, 'video-content-partner').text(),
      duration: findOne(el, 'video-duration').text(),
      releasedOn: findOne(el, 'video-released-on').text(),
      thumbnailUrl: el.find(BoclipsPlayer).prop('thumbnail'),
      badgeAlt: el.find('.video-badge').prop('alt'),
      isSaved: el
        .find('VideoCollectionToggleButton')
        .prop('isInDefaultCollection'),
      subjects: el.find(By.dataQa('video-subject')).map(tag => tag.text()),
    }));
  }

  public getVideoCard(index: number) {
    return findAll(this.wrapper, 'video-card').at(index);
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
      expect(this.wrapper.find(By.dataQa('video-title'))).toExist();
    });
  }

  private async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'search-page');
    });
  }
}
