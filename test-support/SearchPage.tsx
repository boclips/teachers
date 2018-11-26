import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../src/App';
import { links, videos } from '../src/video-service-responses';
import { By } from './By';
import { findAll, findOne } from './enzymeHelpers';
import eventually from './eventually';
import MockFetchVerify from './MockFetchVerify';

export class SearchPage {
  constructor(public wrapper: ReactWrapper) {}

  public static async load(query: string) {
    const escapedQuery = encodeURIComponent(query);

    MockFetchVerify.get('/v1/', JSON.stringify(links));
    MockFetchVerify.get(
      `/v1/videos?pageNumber=0&pageSize=10&query=${escapedQuery}`,
      JSON.stringify(videos),
    );

    const page = new SearchPage(
      mount(
        <App
          history={createMemoryHistory({
            initialEntries: [`/videos?pageNumber=1&q=${escapedQuery}`],
          })}
        />,
      ),
    );

    await page.hasLoaded();
    return page;
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

  public getCount(): number {
    return parseInt(this.wrapper.find(By.dataQa('search-count')).text(), 10);
  }

  private async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'search-page');
    });
  }
}
