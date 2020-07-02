import { mount, ReactWrapper } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import App from '../../src/app/App';
import VideoPlayer from '../../src/components/video/player/VideoPlayer';
import By from '../By';
import { findAll, findOne } from '../enzymeHelpers';
import eventually from '../eventually';

class VideoDetailsPage {
  public constructor(private wrapper: ReactWrapper) {}

  public static async load() {
    const page = new VideoDetailsPage(
      mount(
        <App
          history={createMemoryHistory({ initialEntries: ['/videos/177'] })}
          apiPrefix="https://api.example.com"
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
    return findOne(this.wrapper, 'video-details').map((el) => ({
      title: findOne(el, 'video-title').text(),
      description: findOne(el, 'video-description').text(),
      additionalDescription: findOne(el, 'additional-description').text(),
      createdBy: findOne(el, 'video-created-by').text(),
      duration: findOne(el, 'video-duration').text(),
      releasedOn: findOne(el, 'video-released-on').text(),
      subjects: findAll(el, 'subject-tag')
        .find(By.dataQa('filter-tag'))
        .map((tag) => tag.text()),
      playerVideoId: el.find(VideoPlayer).prop('video').id,
    }))[0];
  }
}

export default VideoDetailsPage;
