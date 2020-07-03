import { mount, ReactWrapper } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import App from '../../src/app/App';
import { findOne } from '../enzymeHelpers';
import eventually from '../eventually';
import { AbstractCollectionListPage } from './AbstractCollectionListPage';

class DiscoverCollectionListPage extends AbstractCollectionListPage {
  public constructor(public wrapper: ReactWrapper) {
    super(wrapper);
  }

  public static async loadBySubject(subjectId: string) {
    return this.loadByUrl(`/discover-collections?subject=${subjectId}`);
  }

  public static async loadByDiscipline(disciplineId: string) {
    return this.loadByUrl(`/discover-collections?discipline=${disciplineId}`);
  }

  private static async loadByUrl(url: string) {
    const page = new DiscoverCollectionListPage(
      mount(
        <App
          history={createMemoryHistory({
            initialEntries: [url],
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
      findOne(this.wrapper, 'discover-collections-list-page');
    });
  }
}

export default DiscoverCollectionListPage;
