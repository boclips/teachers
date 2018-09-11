import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../App';
import { SearchPage } from '../search-videos/SearchView.integrationTest';
import { findOne, login } from '../test-support/enzymeHelpers';
import eventually from '../test-support/eventually';
import MockFetchVerify from '../test-support/MockFetchVerify';
import { links } from '../video-service-responses';

test('after successful login redirects to video search', async () => {
  const page = await LoginPage.mount();

  const searchPage = await page.login('user', 'password');

  await searchPage.hasLoaded();
});

export class LoginPage {
  constructor(private wrapper: ReactWrapper) {}

  public static async mount() {
    const linksStub = MockFetchVerify.get('/v1/', JSON.stringify(links));
    const page = new LoginPage(
      mount(<App history={createMemoryHistory({ initialEntries: ['/'] })} />),
    );
    linksStub.verify();
    await page.hasLoaded();
    return page;
  }

  public async hasLoaded() {
    await eventually(() => {
      this.wrapper = this.wrapper.update();
      findOne(this.wrapper, 'login-page');
    });
  }

  public login(username: string, password): Promise<SearchPage> {
    login(this.wrapper, username, password);

    return SearchPage.mount(this.wrapper);
  }
}
