import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../../src/app/App';
import { findOne } from '../enzymeHelpers';
import eventually from '../eventually';
import { AbstractCollectionListPage } from './AbstractCollectionListPage';

export class BookmarkedCollectionListPage extends AbstractCollectionListPage {
  public constructor(public wrapper: ReactWrapper) {
    super(wrapper);
  }

  public static async load() {
    const page = new BookmarkedCollectionListPage(
      mount(
        <App
          history={createMemoryHistory({
            initialEntries: [`/bookmarked-collections`],
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
      findOne(this.wrapper, 'bookmarked-collection-list-page');
    });
  }
}
