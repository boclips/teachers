import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../../src/app/App';
import { By } from '../By';
import { findOne } from '../enzymeHelpers';
import eventually from '../eventually';

export class HomePage {
  constructor(private wrapper: ReactWrapper) {}

  public static async load() {
    const page = new HomePage(
      mount(<App history={createMemoryHistory({ initialEntries: ['/'] })} />),
    );
    await page.hasLoaded();
    return page;
  }

  public async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'home-page');
    });
  }

  public getPublicCollections(): Collection[] {
    return this.wrapper.find(By.dataQa('collection-card')).map(el => ({
      title: findOne(el, 'collection-title').text(),
      numberOfVideos: Number(findOne(el, 'collection-number-of-videos').text()),
    }));
  }
}

interface Collection {
  title: string;
  numberOfVideos: number;
}
