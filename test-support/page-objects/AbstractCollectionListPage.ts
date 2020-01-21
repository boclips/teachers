import { ReactWrapper } from 'enzyme';
import { By } from '../By';
import { findOne } from '../enzymeHelpers';

export abstract class AbstractCollectionListPage {
  public constructor(public wrapper: ReactWrapper) {}

  public getCollections(): Collection[] {
    return this.wrapper
      .find(By.dataQa('collection-card'))
      .hostNodes()
      .map(el => ({
        title: findOne(el, 'collection-title').text(),
        numberOfVideos: Number(
          findOne(el, 'collection-number-of-videos').text(),
        ),
      }));
  }

  public getDisciplineSubjects(): string[] {
    return this.wrapper
      .find(By.dataQa('discipline-subject-link'))
      .map(el => el.text());
  }
}

export interface Collection {
  title: string;
  numberOfVideos: number;
}
