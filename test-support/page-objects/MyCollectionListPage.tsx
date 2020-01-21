import { mount, ReactWrapper } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import App from '../../src/app/App';
import NotificationFactory from '../../src/components/common/NotificationFactory';
import { findOne } from '../enzymeHelpers';
import eventually from '../eventually';
import { AbstractCollectionListPage } from './AbstractCollectionListPage';

export class MyCollectionListPage extends AbstractCollectionListPage {
  public constructor(public wrapper: ReactWrapper) {
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
          apiPrefix="https://api.example.com"
        />,
      ),
    );

    await page.hasLoaded();
    return page;
  }

  private async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'collection-list-page');
    });
  }
}
