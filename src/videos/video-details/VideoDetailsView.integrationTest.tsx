import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { findOne, search } from '../../../test-support/enzymeHelpers';
import eventually from '../../../test-support/eventually';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import App from '../../App';
import { links, video177, videos } from '../../video-service-responses';

test('video details shows data', async () => {
  MockFetchVerify.get('/v1/', JSON.stringify(links));
  VideoDetailsPage.mockVideoDetails(video177);
  const videoDetailsPage = await VideoDetailsPage.mount();

  expect(videoDetailsPage.getVideoDetails()).toEqual({
    title: 'KS3/4 Science: Demonstrating Chemistry',
    description: 'Matthew Tosh shows us the science.',
    contentProvider: 'cp1',
    duration: ' 1m 2s',
    releasedOn: 'Feb 11, 2018',
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/177.jpg',
  });
});

export class VideoDetailsPage {
  constructor(private wrapper: ReactWrapper) {}

  public static mockVideoDetails(video: any) {
    MockFetchVerify.get(`/v1/videos/${video.id}`, JSON.stringify(video));
  }

  public static async mount() {
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
