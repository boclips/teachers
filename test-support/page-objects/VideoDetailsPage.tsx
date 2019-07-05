import { Player } from 'boclips-player-react';
import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../../src/app/App';
import { By } from '../By';
import { findAll, findOne } from '../enzymeHelpers';
import eventually from '../eventually';

export class VideoDetailsPage {
  constructor(private wrapper: ReactWrapper) {}

  public static async load() {
    const page = new VideoDetailsPage(
      mount(
        <App
          history={createMemoryHistory({ initialEntries: ['/videos/177'] })}
          apiPrefix="https://api.example.com"
        />,
      ),
    );
    await page.hasLoaded();
    return page;
  }

  public async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'video-details-page');
    });
  }

  public getVideoDetails() {
    return findOne(this.wrapper, 'video-details').map(el => ({
      title: findOne(el, 'video-title').text(),
      description: findOne(el, 'video-description').text(),
      contentPartner: findOne(el, 'video-content-partner').text(),
      duration: findOne(el, 'video-duration').text(),
      releasedOn: findOne(el, 'video-released-on').text(),
      subjects: findAll(el, 'subject')
        .find(By.dataQa('filter-tag'))
        .map(tag => tag.text()),
      playerVideoUri: el.find(Player).prop('videoUri'),
    }))[0];
  }
}
