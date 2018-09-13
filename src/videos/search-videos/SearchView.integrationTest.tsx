import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import App from '../../App';
import { LoginPage } from '../../login/LoginView.integrationTest';
import { findAll, findOne, search } from '../../test-support/enzymeHelpers';
import eventually from '../../test-support/eventually';
import MockFetchVerify from '../../test-support/MockFetchVerify';
import { links, videos } from '../../video-service-responses';

test('search for a video shows results', async () => {
  const loginPage = await LoginPage.mount();
  const searchPage = await SearchPage.mount(
    loginPage.loginWithValidCredentials('user', 'password'),
  );

  await searchPage.search('some video');

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
  constructor(private wrapper: ReactWrapper) {}

  public static async mount(reactWrapper?: ReactWrapper) {
    MockFetchVerify.get('/v1/', JSON.stringify(links));
    const page = new SearchPage(reactWrapper || mount(<App />));
    await page.hasLoaded();
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

  public async search(query: string) {
    const stub = MockFetchVerify.get(
      '/v1/videos?query=some video',
      JSON.stringify(videos),
    );
    search(this.wrapper, query);
    stub.verify();

    await this.hasResults();
  }

  public getVideoResults() {
    return findAll(this.wrapper, 'search-result').map(el => ({
      title: findOne(el, 'search-result-title').text(),
      description: findOne(el, 'search-result-description').text(),
      contentProvider: findOne(el, 'search-result-content-provider').text(),
      duration: findOne(el, 'search-result-duration').text(),
      releasedOn: findOne(el, 'search-result-released-on').text(),
      thumbnailUrl: findOne(el, 'video-thumbnail').prop('src'),
    }));
  }
}
