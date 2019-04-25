import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../../src/app/App';
import { RemoveCollectionButtonInner } from '../../src/components/collection/card/header/RemoveCollectionButton';
import NotificationFactory from '../../src/components/common/NotificationFactory';
import { By } from '../By';
import { findOne } from '../enzymeHelpers';
import eventually from '../eventually';
import { AbstractCollectionListPage } from './AbstractCollectionListPage';

export class MyCollectionListPage extends AbstractCollectionListPage {
  constructor(public wrapper: ReactWrapper) {
    super(wrapper);
  }

  public static async load() {
    jest.spyOn(NotificationFactory, 'success');
    const page = new MyCollectionListPage(
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
