import { mount, ReactWrapper } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import App from '../App';
import { findOne, login } from '../test-support/enzymeHelpers';
import eventually from '../test-support/eventually';
import MockFetchVerify from '../test-support/MockFetchVerify';
import { links } from '../video-service-responses';
import { SearchPage } from '../videos/search-videos/SearchView.integrationTest';

test('after successful login redirects to video search', async () => {
  const userStub = MockFetchVerify.get('/v1/user', 200);
  const page = await LoginPage.mount();

  const searchPage = await SearchPage.mount(page.login('user', 'password'));
  userStub.verify();

  await searchPage.hasLoaded();
});

test('after unsuccessful login remains in search and displays error', async () => {
  const userStub = MockFetchVerify.get('/v1/user', 401);
  const loginPage = await LoginPage.mount();

  loginPage.tryToLogin('wrong-user', 'password');
  userStub.verify();

  await eventually(() => {
    expect(loginPage.hasWrongCredentialsAlert()).toBeTruthy();
  });
});

export class LoginPage {
  constructor(private wrapper: ReactWrapper) {}

  public static async mount(url: string = '/') {
    const linksStub = MockFetchVerify.get('/v1/', JSON.stringify(links));
    const page = new LoginPage(
      mount(<App history={createMemoryHistory({ initialEntries: [url] })} />),
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

  public loginWithValidCredentials(username: string, password: string) {
    MockFetchVerify.get('/v1/user', 200);
    return this.login(username, password);
  }

  public login(username: string, password: string): ReactWrapper {
    this.tryToLogin(username, password);

    return this.wrapper;
  }

  public tryToLogin(username: string, password: string) {
    login(this.wrapper, username, password);
  }

  public hasWrongCredentialsAlert() {
    this.wrapper.update();
    return findOne(this.wrapper, 'wrong-credentials-alert').exists();
  }
}
