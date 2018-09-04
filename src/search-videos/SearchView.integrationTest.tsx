import {mount, ReactWrapper} from 'enzyme';
import fetchMock from 'fetch-mock';
import React from 'react';
import App from '../App';
import {findAll, findOne, search} from '../test-support/enzymeHelpers';
import eventually from '../test-support/eventually';
import {links, videos} from './video-service-responses';

test('search for a video shows results', async () => {
  fetchMock.get('/v1/', JSON.stringify(links));
  fetchMock.get('/v1/videos?query=some video', JSON.stringify(videos));
  const page = new SearchPage();
  await page.hasLoaded();

  page.search('some video');
  await page.hasResults();

  expect(page.getVideoResults()).toHaveLength(2);
  expect(page.getVideoResults()[0]).toEqual('KS3/4 Science: Demonstrating Chemistry');
});

class SearchPage {
  private wrapper: ReactWrapper;

  constructor() {
    this.wrapper = mount(<App/>);
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

  public search(query: string) {
    search(this.wrapper, query);
  }

  public getVideoResults() {
    return findAll(this.wrapper, 'search-result-title').map((el) => el.text());
  }

}
