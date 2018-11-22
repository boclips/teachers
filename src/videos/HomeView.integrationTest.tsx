import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { findOne, search } from '../../test-support/enzymeHelpers';
import eventually from '../../test-support/eventually';
import MockFetchVerify from '../../test-support/MockFetchVerify';
import App from '../App';
import { links, videos } from '../video-service-responses';
import { SearchPage } from './search-videos/SearchResultsView.integrationTest';

test('search for a video goes to search page with results', async () => {
  const homeView = await HomeViewPage.mount();
  const searchPage = new SearchPage(homeView.wrapper);

  homeView.search('some video');

  await searchPage.hasLoaded();
});

export class HomeViewPage {
  constructor(public wrapper: ReactWrapper) {}

  public static async mount() {
    MockFetchVerify.get('/v1/', JSON.stringify(links));
    const page = new HomeViewPage(
      mount(<App history={createMemoryHistory({ initialEntries: ['/'] })} />),
    );
    await page.hasLoaded();
    return page;
  }

  public async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'home-page', 'div');
    });
  }

  public search(query: string) {
    MockFetchVerify.get(
      '/v1/videos?query=some%20video',
      JSON.stringify(videos),
    );
    search(this.wrapper, query);
  }
}
