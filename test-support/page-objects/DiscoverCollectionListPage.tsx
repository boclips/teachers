import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../../src/app/App';
import { findOne } from '../enzymeHelpers';
import eventually from '../eventually';
import { AbstractCollectionListPage } from './AbstractCollectionListPage';

export class DiscoverCollectionListPage extends AbstractCollectionListPage {
  constructor(public wrapper: ReactWrapper) {
    super(wrapper);
  }

  public static async loadMaths() {
    const page = new DiscoverCollectionListPage(
      mount(
        <App
          history={createMemoryHistory({
            initialEntries: [`/discover-collections?subject=maths`],
          })}
        />,
      ),
    );

    await page.hasLoaded();
    return page;
  }

  private async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'discover-collections-list-page');
    });
  }
}
