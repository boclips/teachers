import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { findAll, findOne } from '../../../test-support/enzymeHelpers';
import eventually from '../../../test-support/eventually';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import App from '../../App';
import { links, videos } from '../../video-service-responses';

test('search for a video shows results', async () => {
  MockFetchVerify.get(
    `/v1/videos?pageNumber=0&pageSize=10&query=${encodeURIComponent(
      'some video',
    )}`,
    JSON.stringify(videos),
  );

  const searchPage = await SearchPage.mount();

  expect(searchPage.getVideoResults()).toHaveLength(2);
  expect(searchPage.getVideoResults()[0]).toEqual({
    title: 'KS3/4 Science: Demonstrating Chemistry',
    description: 'Matthew Tosh shows us the science.',
    contentProvider: 'cp1',
    duration: ' 1m 2s',
    releasedOn: 'Feb 11, 2018',
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/177.jpg',
  });
});

export class SearchPage {
  constructor(public wrapper: ReactWrapper) {}

  public static async mount() {
    MockFetchVerify.get('/v1/', JSON.stringify(links));
    const page = new SearchPage(
      mount(
        <App
          history={createMemoryHistory({
            initialEntries: ['/videos?pageNumber=1&q=some%20video'],
          })}
        />,
      ),
    );
    await page.hasLoaded();
    await this.hasResults();
    return page;
  }

  public async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'search-page');
    });
  }

  public async hasResults() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      this.getVideoResults();
    });
  }

  public getVideoResults() {
    return findAll(this.wrapper, 'search-result').map(el => ({
      title: findOne(el, 'video-title').text(),
      description: findOne(el, 'video-description').text(),
      contentProvider: findOne(el, 'video-content-provider').text(),
      duration: findOne(el, 'video-duration').text(),
      releasedOn: findOne(el, 'video-released-on').text(),
      thumbnailUrl: findOne(el, 'video-thumbnail').prop('src'),
    }));
  }

  private static hasResults() {}
}
