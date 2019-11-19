import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../../src/app/App';
import { findOne } from '../enzymeHelpers';
import eventually from '../eventually';

export class CreateAccountPage {
  public constructor(public wrapper: ReactWrapper) {}

  public static async load(params = '') {
    const reactWrapper = mount(
      <App
        history={createMemoryHistory({
          initialEntries: [`/create-account${params}`],
        })}
        apiPrefix="https://api.example.com"
      />,
    );

    const page = new CreateAccountPage(reactWrapper);

    await page.hasLoaded();
    return page;
  }

  private async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'create-account-page');
    });
  }
}
