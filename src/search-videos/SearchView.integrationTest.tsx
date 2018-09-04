import {mount, ReactWrapper} from 'enzyme';
import React from 'react';
import App from '../App';
import {findAll, findOne, search} from '../test-support/enzymeHelpers';
import eventually from '../test-support/eventually';
import MockFetchVerify from '../test-support/MockFetchVerify';
import {links, videos} from './video-service-responses';

test('search for a video shows results', async () => {
  const page = await SearchPage.mount();

  await page.search('some video');

  expect(page.getVideoResults()).toHaveLength(2);
  expect(page.getVideoResults()[0]).toEqual('KS3/4 Science: Demonstrating Chemistry');
});

class SearchPage {
  constructor(private wrapper: ReactWrapper) {
  }

  public static async mount() {
    const linksStub = MockFetchVerify.get('/v1/', JSON.stringify(links));
    const page = new SearchPage(mount(<App/>));
    linksStub.verify();
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
    const stub = MockFetchVerify.get('/v1/videos?query=some video', JSON.stringify(videos));
    search(this.wrapper, query);
    stub.verify();

    await this.hasResults();
  }

  public getVideoResults() {
    return findAll(this.wrapper, 'search-result-title').map((el) => el.text());
  }
}
