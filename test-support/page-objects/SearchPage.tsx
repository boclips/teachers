import { mount, ReactWrapper } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import { generateUri } from 'src/utils';
import 'urijs/src/URITemplate';
import App from '../../src/app/App';
import VideoPlayer from '../../src/components/video/player/VideoPlayer';
import { By } from '../By';
import { findAll, findOne } from '../enzymeHelpers';
import eventually from '../eventually';

export class SearchPage {
  public constructor(public wrapper: ReactWrapper) {}

  public static async load(params: {
    q: string;
    subject?: string[];
    age_range_min?: number;
    age_range_max?: number;
  }) {
    const browserUrl = generateUri('/videos', { ...params, page: 1 });
    const page = new SearchPage(
      mount(
        <App
          history={createMemoryHistory({
            initialEntries: [browserUrl],
          })}
          apiPrefix="https://api.example.com"
        />,
      ),
    );

    await page.hasLoaded();
    return page;
  }

  public getVideoResults() {
    return findAll(this.wrapper, 'video-card')
      .hostNodes()
      .map((el) => ({
        title: findOne(el, 'video-title').text(),
        description: findOne(el, 'video-description').text(),
        createdBy: findOne(el, 'video-created-by').text(),
        duration: findOne(el, 'video-duration').text(),
        releasedOn: findOne(el, 'video-released-on').text(),
        badgeAlt: el.find('.video-badge').prop('alt'),
        isSaved: el
          .find('ManageVideoCollectionsButton')
          .first()
          .prop('isInDefaultCollection'),
        subjects: el.find(By.dataQa('subject')).map((tag) => tag.text()),
        playerVideoId: el.find(VideoPlayer).prop('video').id,
      }));
  }

  public getCollectionResults() {
    return findAll(this.wrapper, 'collection-card')
      .hostNodes()
      .map((el) => ({
        title: findOne(el, 'collection-title').text(),
        numberOfVideos: +findOne(el, 'collection-number-of-videos').text(),
      }));
  }

  public getCount(): number {
    return parseInt(this.wrapper.find(By.dataQa('search-count')).text(), 10);
  }

  public clickOnFirstTitle() {
    this.wrapper
      .find(By.dataQa('video-title'))
      .first()
      .simulate('click', { button: 0 });
  }

  public async isOnDetailsPage() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      expect(this.wrapper.find(By.dataQa('video-title'))).toExist();
    });
  }

  private async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'search-page');
    });
  }
}
