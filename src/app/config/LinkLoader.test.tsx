import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Store } from 'redux';
import { MockStoreFactory } from '../../../test-support/factories';
import { LoadingComponent } from '../../components/common/LoadingComponent';
import { Links } from '../../types/Links';
import { AuthenticationStateValue } from '../../types/State';
import { Action } from '../redux/actions';
import { requestAuthentication } from '../redux/authentication/actions/requestAuthentication';
import { fetchLinksAction } from '../redux/links/actions/fetchLinksAction';
import { UnconnectedLinkLoader } from './LinkLoader';
import LinkLoader from './LinkLoader';

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
  links?: Partial<Links>,
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
    expect(action.type).toEqual(requestAuthentication.type);
    expect(action.payload).toEqual({
      authenticationRequired: false,
    });
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
});

describe('The component can update links once authenticated', () => {
  it('requests links when authentication is resolved', () => {
    const fetchLinksSpy = jest.fn();
    const requestAuthenticationSpy = jest.fn();

    const component = mount(
      <UnconnectedLinkLoader
        authenticationResolved={false}
        linksHaveLoaded={false}
        fetchLinks={fetchLinksSpy}
        requestAuthentication={requestAuthenticationSpy}
      >
        <ChildComponent />
      </UnconnectedLinkLoader>,
    );

    expect(requestAuthenticationSpy).toHaveBeenCalledTimes(1);

    component.setProps({ authenticationResolved: true });

    expect(fetchLinksSpy).toHaveBeenCalledTimes(1);

    component.setProps({ linksHaveLoaded: true });

    const child = component.find(ChildComponent);
    expect(child).toExist();
  });
});
