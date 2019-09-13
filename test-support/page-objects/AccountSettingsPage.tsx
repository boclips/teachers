import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../../src/app/App';
import { findOne } from '../enzymeHelpers';
import eventually from '../eventually';

export class AccountSettingsPage {
  constructor(public wrapper: ReactWrapper) {}

  public static async load() {
    const reactWrapper = mount(
      <App
        history={createMemoryHistory({
          initialEntries: [`/account-settings`],
        })}
        apiPrefix="https://api.example.com"
      />,
    );

    const page = new AccountSettingsPage(reactWrapper);

    await page.hasLoaded();
    return page;
  }

  private async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'account-settings-page');
    });
  }
}
