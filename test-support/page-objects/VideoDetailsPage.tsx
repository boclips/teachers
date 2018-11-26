import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../../src/App';
import { links, video177, videos } from '../../src/video-service-responses';
import { findOne, search } from '../enzymeHelpers';
import eventually from '../eventually';
import MockFetchVerify from '../MockFetchVerify';

export class VideoDetailsPage {
  constructor(private wrapper: ReactWrapper) {}

  public static async load() {
    MockFetchVerify.get('/v1/', JSON.stringify(links));
    MockFetchVerify.get(`/v1/videos/${video177.id}`, JSON.stringify(video177));

    const page = new VideoDetailsPage(
      mount(
        <App
          history={createMemoryHistory({ initialEntries: ['/videos/177'] })}
        />,
      ),
    );
    await page.hasLoaded();
    return page;
  }

  public async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'video-details-page');
    });
  }

  public getVideoDetails() {
    return findOne(this.wrapper, 'video-details').map(el => ({
      title: findOne(el, 'video-title').text(),
      description: findOne(el, 'video-description').text(),
      contentProvider: findOne(el, 'video-content-provider').text(),
      duration: findOne(el, 'video-duration').text(),
      releasedOn: findOne(el, 'video-released-on').text(),
      thumbnailUrl: findOne(el, 'video-thumbnail').prop('src'),
    }))[0];
  }

  public async search(query: string) {
    MockFetchVerify.get(`/v1/videos?query=${query}`, JSON.stringify(videos));
    search(query);

    await this.hasNavigatedToSearchResults();
  }

  public async hasNavigatedToSearchResults() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'search-page');
    });
  }
}
