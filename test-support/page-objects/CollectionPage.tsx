import { mount, ReactWrapper } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import App from '../../src/app/App';
import { CollectionHeader } from '../../src/components/collection/details/header/CollectionHeader';
import VideoPlayer from '../../src/components/video/player/VideoPlayer';
import { By } from '../By';
import { findAll, findOne } from '../enzymeHelpers';
import eventually from '../eventually';

export class CollectionPage {
  public constructor(public wrapper: ReactWrapper) {}

  public static async load(collectionId: string = 'id') {
    const page = new CollectionPage(
      mount(
        <App
          history={createMemoryHistory({
            initialEntries: [`/collections/${collectionId}`],
          })}
          apiPrefix="https://api.example.com"
        />,
      ),
    );

    await page.hasLoaded();
    return page;
  }

  public getVideos() {
    return this.wrapper
      .find(By.dataQa('video-card'))
      .hostNodes()
      .map((el) => ({
        title: findOne(el, 'video-title').text(),
        description: findOne(el, 'video-description').text(),
        createdBy: findOne(el, 'video-created-by').text(),
        duration: findOne(el, 'video-duration').text(),
        releasedOn: findOne(el, 'video-released-on').text(),
        isSaved: el.find(By.dataQa('remove-from-collection')).length === 1,
        subjects: el
          .find(By.dataQa('subject-tag'))
          .find(By.dataQa('filter-tag'))
          .map((tag) => tag.text()),
        playerVideoId: el.find(VideoPlayer).prop('video').id,
      }));
  }

  public getSubCollections() {
    return this.wrapper
      .find(By.dataQa('collection-card'))
      .hostNodes()
      .map((el) => ({
        title: findOne(el, 'collection-title').text(),
        description: findOne(el, 'collection-description').text(),
        subjects: el
          .find(By.dataQa('subject-tag'))
          .find(By.dataQa('filter-tag'))
          .map((tag) => tag.text()),
        playerVideoId: el.find(VideoPlayer).prop('video').id,
      }));
  }

  public getCollectionDetails() {
    return this.wrapper.find(CollectionHeader).map((el) => ({
      title: findOne(el, 'collection-title').text(),
      subjects: el.find(By.dataQa('subject-tag')).map((s) => s.text()),
      lastUpdated: findOne(el, 'collection-updated-at').text(),
      ageRange: el
        .find(By.dataQa('age-range'))
        .find(By.dataQa('filter-tag'))
        .text(),
      description: findOne(el, 'collection-description').text(),
    }))[0];
  }

  public isEmptyCollection() {
    return this.wrapper.find(By.dataQa('collection-view-empty')).length > 0;
  }

  public isEditable() {
    return this.wrapper.find(By.dataQa('collection-edit-button')).length > 0;
  }

  public removeVideo(index: number) {
    return findAll(this.wrapper, 'video-card')
      .at(index)
      .find(By.dataQa('remove-from-collection', 'button'))
      .first()
      .simulate('click');
  }

  private async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'collection-page');
    });
  }
}
