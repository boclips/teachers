import { mount, ReactWrapper } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import { CollectionBanner } from 'src/components/collection/details/header/CollectionBanner';
import App from '../../src/app/App';
import { CollectionHeader } from '../../src/components/collection/details/header/CollectionHeader';
import VideoPlayer from '../../src/components/video/player/VideoPlayer';
import By from '../By';
import { findAll, findOne } from '../enzymeHelpers';
import eventually from '../eventually';

class CollectionPage {
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
      }));
  }

  public getCollectionUnits() {
    return this.wrapper
      .find(By.dataQa('collection-unit-list'))
      .hostNodes()
      .map((el) =>
        el.find(By.dataQa('collection-unit-title')).map((s) => s.text()),
      )[0];
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

  public getParentCollectionDetails() {
    let collectionDetails = {};

    // eslint-disable-next-line prefer-destructuring
    collectionDetails = this.wrapper.find(CollectionBanner).map((el) => ({
      title: findOne(el, 'collection-title').text(),
      ...collectionDetails,
    }))[0];

    // eslint-disable-next-line prefer-destructuring
    collectionDetails = this.wrapper.find(CollectionHeader).map((el) => ({
      subjects: el.find(By.dataQa('subject-tag')).map((s) => s.text()),
      ageRange: el
        .find(By.dataQa('age-range'))
        .find(By.dataQa('filter-tag'))
        .text(),
      description: findOne(el, 'collection-description').text(),
      ...collectionDetails,
    }))[0];

    return collectionDetails;
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

export default CollectionPage;
