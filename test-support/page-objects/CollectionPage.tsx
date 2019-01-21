import { BoclipsPlayer } from 'boclips-react-player';
import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../../src/app/App';
import { findAll, findOne } from '../enzymeHelpers';
import eventually from '../eventually';
import MockFetchVerify from '../MockFetchVerify';
import { links } from '../video-service-responses';

export class CollectionPage {
  constructor(public wrapper: ReactWrapper) {}

  public static async load(videoCollection: any) {
    MockFetchVerify.get('/v1/', JSON.stringify(links));
    MockFetchVerify.get(`/v1/collections/default`, videoCollection);

    const page = new CollectionPage(
      mount(
        <App
          history={createMemoryHistory({
            initialEntries: [`/collections/default`],
          })}
        />,
      ),
    );

    await page.hasLoaded();
    return page;
  }

  public getVideos() {
    return findAll(this.wrapper, 'collection-video').map(el => ({
      title: findOne(el, 'video-title').text(),
      description: findOne(el, 'video-description').text(),
      contentProvider: findOne(el, 'video-content-provider').text(),
      duration: findOne(el, 'video-duration').text(),
      releasedOn: findOne(el, 'video-released-on').text(),
      thumbnailUrl: el.find(BoclipsPlayer).prop('thumbnail'),
      badgeAlt: el.find('.video-badge').prop('alt'),
      isSaved:
        findOne(el, 'default-collection-toggle', 'button').text() === 'Saved',
    }));
  }

  private async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'collection-page');
    });
  }
}
