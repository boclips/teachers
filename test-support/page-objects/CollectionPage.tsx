import { BoclipsPlayer } from 'boclips-react-player';
import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../../src/app/App';
import { By } from '../By';
import { findAll, findOne } from '../enzymeHelpers';
import eventually from '../eventually';

export class CollectionPage {
  constructor(public wrapper: ReactWrapper) {}

  public static async load(collectionId: string = 'id') {
    const page = new CollectionPage(
      mount(
        <App
          history={createMemoryHistory({
            initialEntries: [`/collections/${collectionId}`],
          })}
        />,
      ),
    );

    await page.hasLoaded();
    return page;
  }

  public getVideos() {
    return this.wrapper.find(By.dataQa('video-card')).map(el => ({
      title: findOne(el, 'video-title').text(),
      description: findOne(el, 'video-description').text(),
      contentPartner: findOne(el, 'video-content-partner').text(),
      duration: findOne(el, 'video-duration').text(),
      releasedOn: findOne(el, 'video-released-on').text(),
      thumbnailUrl: el.find(BoclipsPlayer).prop('thumbnail'),
      badgeAlt: el.find('.video-badge').prop('alt'),
      isSaved: el.find(By.dataQa('remove-from-collection')).length === 1,
      subjects: el.find(By.dataQa('video-subject')).map(tag => tag.text()),
    }));
  }

  public isEmptyCollection() {
    return this.wrapper.find(By.dataQa('collection-view-empty')).length > 0;
  }

  public isEditable() {
    return this.wrapper.find(By.dataQa('collection-edit-button')).length > 0;
  }

  public getVideoCard(index: number) {
    return findAll(this.wrapper, 'video-card').at(index);
  }

  public removeVideo(index: number) {
    return findAll(this.wrapper, 'video-card')
      .at(index)
      .find(By.dataQa('remove-from-collection', 'button'))
      .simulate('click');
  }

  public isRemovableVideo(index: number) {
    return (
      findAll(this.wrapper, 'video-card')
        .at(index)
        .find(By.dataQa('remove-from-collection', 'button')).length > 0
    );
  }

  private async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'collection-page');
    });
  }
}
