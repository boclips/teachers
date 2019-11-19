import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../../src/app/App';
import { By } from '../By';
import { findOne } from '../enzymeHelpers';
import eventually from '../eventually';

export class HomePage {
  public constructor(private wrapper: ReactWrapper) {}

  public static async load() {
    const page = new HomePage(
      mount(
        <App
          history={createMemoryHistory({ initialEntries: ['/'] })}
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
      findOne(this.wrapper, 'home-page');
    });
  }

  public getPublicCollections(): Collection[] {
    return this.wrapper
      .find(By.dataQa('collection-card'))
      .map(collectionCard => {
        const subjectWrapper = collectionCard
          .find(By.dataQa('subject-tag'))
          .find(By.dataQa('filter-tag'));

        return {
          title: findOne(collectionCard, 'collection-title').text(),
          numberOfVideos: Number(
            findOne(collectionCard, 'collection-number-of-videos').text(),
          ),
          subject: subjectWrapper.length ? subjectWrapper.text() : null,
        };
      });
  }

  public getVideos(): Video[] {
    return this.wrapper
      .find(By.dataQa('recommended-video'))
      .map(videoPreview => ({
        title: videoPreview.find(By.dataQa('recommended-video-title')).text(),
      }));
  }

  public getDisciplines(): Discipline[] {
    return this.wrapper.find(By.dataQa('discipline-card')).map(card => {
      const subjectWrapper = card.find(By.dataQa('discipline-subject'));

      return {
        name: findOne(card, 'discipline-title').text(),
        subjects: subjectWrapper.map(el => el.text()),
      };
    });
  }
}

interface Video {
  title: string;
}

interface Collection {
  title: string;
  numberOfVideos: number;
  subject: string | null;
}

interface Discipline {
  name: string;
  subjects: string[];
}
