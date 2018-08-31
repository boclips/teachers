import {mount, ReactWrapper} from 'enzyme';
import * as fetch from 'fetch-mock';
import * as React from 'react';
import App from '../App';
import {click, enterKeys, findAll, findOne, search} from '../test-support/enzymeHelpers';
import eventually from '../test-support/eventually';
import {links, videos} from './video-service-responses';

test('search for a video shows results', async () => {
  fetch.mockResponseOnce(JSON.stringify(links), {url: '/api/v1/'});
  fetch.mockResponseOnce(JSON.stringify(videos), {url: '/videos?query=some%20video'});
  const page = new SearchPage();
  await page.hasLoaded();

  await page.search('some video');

  expect(page.getVideoResults()).toHaveLength(2);
  expect(page.getVideoResults()[0]).toEqual('KS3/4 Science: Demonstrating Chemistry');
});

class SearchPage {
  private wrapper: ReactWrapper;

  constructor() {
    this.wrapper = mount(<App/>);
  }

  async hasLoaded() {
    await eventually(() => {
      findOne(this.wrapper, 'search-page')
    });
  }

  async search(query: string) {
    search(this.wrapper, query);
  }

  getVideoResults() {
    return findAll(this.wrapper, 'search-result-title').map((el) => el.text())
  }

}

