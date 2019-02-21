import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../../src/app/App';
import { By } from '../By';
import { findOne } from '../enzymeHelpers';
import eventually from '../eventually';

export class CollectionListPage {
  constructor(public wrapper: ReactWrapper) {}

  public static async load() {
    const page = new CollectionListPage(
      mount(
        <App
          history={createMemoryHistory({
            initialEntries: [`/collections`],
          })}
        />,
      ),
    );

    await page.hasLoaded();
    return page;
  }

  public getCollections(): Collection[] {
    return this.wrapper.find(By.dataQa('collection-card')).map(el => ({
      title: findOne(el, 'collection-title').text(),
      numberOfVideos: Number(findOne(el, 'collection-number-of-videos').text()),
      updatedAt: findOne(el, 'collection-updated-at').text(),
    }));
  }

  private async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'collection-list-page');
    });
  }
}

interface Collection {
  title: string;
  numberOfVideos: number;
}
