import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Store } from 'redux';
import { MockStoreFactory } from 'test-support/factories';
import { LoadingComponent } from 'src/components/common/LoadingComponent';
import { AuthenticationStateValue, LinksStateValue } from 'src/types/State';
import { ErrorView } from 'src/views/error/ErrorView';
import { requestAuthenticationCheck } from 'src/app/redux/authentication/actions/requestAuthenticationCheck';
import { Action } from '../redux/actions';
import { fetchLinksAction } from '../redux/links/actions/fetchLinksAction';
import { LinkLoader } from './LinkLoader';

const ChildComponent = () => <span data-qa="restricted-content" />;

const mountComponent = (store: Store) =>
  mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <LinkLoader>
          <ChildComponent />
        </LinkLoader>
      </MemoryRouter>
    </Provider>,
  );

const getMockStore = (
  authentication: AuthenticationStateValue,
  links?: Partial<LinksStateValue>,
) =>
  MockStoreFactory.sample({
    authentication,
    links: links as any,
  });

describe('when authentication status is undefined', () => {
  it('should request authentication', () => {
    const store = getMockStore(undefined);

    mountComponent(store);

    expect(store.getActions()).toHaveLength(1);
    const action: Action<any> = store.getActions()[0];
    expect(action.type).toEqual(requestAuthenticationCheck.type);
  });

  it('should render the loading component', () => {
    const store = getMockStore(undefined);

    const component = mountComponent(store);

    const loadingComponent = component.find(LoadingComponent);
    expect(loadingComponent).toExist();
  });
});

describe('when authentication is resolved', () => {
  it('should get links', () => {
    const store = getMockStore({ status: 'authenticated' });

    mountComponent(store);

    expect(store.getActions()).toHaveLength(1);
    const action: Action<any> = store.getActions()[0];
    expect(action.type).toEqual(fetchLinksAction.type);
  });

  it('should render the loading component whilst links are not saved', () => {
    const store = getMockStore({ status: 'authenticated' }, undefined);

    const component = mountComponent(store);

    const loadingComponent = component.find(LoadingComponent);
    expect(loadingComponent).toExist();
  });

  it('should not render children whilst links are not saved', () => {
    const store = getMockStore({ status: 'authenticated' }, undefined);

    const component = mountComponent(store);

    const childComponent = component.find(ChildComponent);
    expect(childComponent).not.toExist();
  });

  it('renders a nonRecoverable error page if links cannot be fetched', () => {
    const store = getMockStore(
      { status: 'authenticated' },
      { entries: null, loadingState: 'failure' },
    );

    const component = mountComponent(store);

    const errorView = component.find(ErrorView);
    const childComponent = component.find(ChildComponent);

    expect(errorView).toExist();
    expect(childComponent).not.toExist();
  });
});
