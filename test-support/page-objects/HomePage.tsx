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
    return this.wrapper
      .find(By.dataQa('collection-card'))
      .map(collectionCard => {
        const subjectWrapper = collectionCard.find(By.dataQa('video-subject'));

        return {
          title: findOne(collectionCard, 'collection-title').text(),
          numberOfVideos: Number(
            findOne(collectionCard, 'collection-number-of-videos').text(),
          ),
          subject: subjectWrapper.length ? subjectWrapper.text() : null,
        };
      });
  }
}

interface Collection {
  title: string;
  numberOfVideos: number;
  subject: string | null;
}
