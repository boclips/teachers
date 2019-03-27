import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../../src/app/App';
import { RemoveCollectionButtonInner } from '../../src/components/collection/card/RemoveCollectionButton';
import NotificationFactory from '../../src/components/common/NotificationFactory';
import { By } from '../By';
import { findOne } from '../enzymeHelpers';
import eventually from '../eventually';

export class CollectionListPage {
  constructor(public wrapper: ReactWrapper) {}

  public static async load() {
    jest.spyOn(NotificationFactory, 'success');
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
      createdBy: findOne(el, 'collection-created-by').text(),
    }));
  }

  public deleteCollection(index: number) {
    const reactWrapper = this.wrapper
      .find(By.dataQa('collection-card'))
      .at(index)
      .find(RemoveCollectionButtonInner);
    const component = reactWrapper.instance();

    // @ts-ignore
    component.confirmRemoveCollection();
  }

  public async assertNotification(message) {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      expect(NotificationFactory.success).toHaveBeenCalledWith({
        description: message,
      });
    });
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
