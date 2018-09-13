import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import App from '../../App';
import { LoginPage } from '../../login/LoginView.integrationTest';
import { findOne } from '../../test-support/enzymeHelpers';
import eventually from '../../test-support/eventually';
import MockFetchVerify from '../../test-support/MockFetchVerify';
import { links } from '../../video-service-responses';

test.skip('video details shows data', async () => {
  const loginPage = await LoginPage.mount('/video/177');
  const videoDetailsPage = await VideoDetailsPage.mount(
    loginPage.loginWithValidCredentials('user', 'password'),
  );

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

  public static async mount(reactWrapper?: ReactWrapper) {
    MockFetchVerify.get('/v1/', JSON.stringify(links));
    const page = new VideoDetailsPage(reactWrapper || mount(<App />));
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
    }));
  }
}
