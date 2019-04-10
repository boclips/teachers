import { ReactWrapper } from 'enzyme';
import { By } from '../By';
import { findOne } from '../enzymeHelpers';

export abstract class AbstractCollectionListPage {
  constructor(public wrapper: ReactWrapper) {}

  public getCollections(): Collection[] {
    return this.wrapper.find(By.dataQa('collection-card')).map(el => ({
      title: findOne(el, 'collection-title').text(),
      numberOfVideos: Number(findOne(el, 'collection-number-of-videos').text()),
      updatedAt: findOne(el, 'collection-updated-at').text(),
      createdBy: findOne(el, 'collection-created-by').text(),
    }));
  }
}

export interface Collection {
  title: string;
  numberOfVideos: number;
}
