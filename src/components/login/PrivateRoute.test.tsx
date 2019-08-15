import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Store } from 'redux';
import { MockStoreFactory } from '../../../test-support/factories';
import { requestAuthentication } from '../../app/redux/authentication/actions/requestAuthentication';
import PrivateRoute from './PrivateRoute';

const ChildComponent = () => <span data-qa="restricted-content" />;

const getComponentWrapper = (store: Store) =>
  mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <PrivateRoute path="/">
          <ChildComponent />
        </PrivateRoute>
      </MemoryRouter>
    </Provider>,
  );

describe('conditional rendering of children', () => {
  it('will render when it is authenticated', () => {
    const store = MockStoreFactory.sample({
      authentication: {
        status: 'authenticated',
      },
    });

    const componentWrapper = getComponentWrapper(store);

    const content = componentWrapper.find(ChildComponent);
    expect(content).toExist();
  });

  it('will not render when it can not be anonymous but status is anonymous', () => {
    const store = MockStoreFactory.sample({
      authentication: {
        status: 'anonymous',
      },
    });

    const componentWrapper = getComponentWrapper(store);

    const content = componentWrapper.find(ChildComponent);
    expect(content).not.toExist();
  });
});

describe('requesting authorisation', () => {
  it('does request authentication when component cannot be rendered', () => {
    const store = MockStoreFactory.sample({
      authentication: { status: 'anonymous' },
    });

    getComponentWrapper(store);

    expect(store.getActions()).toHaveLength(1);

    const action = store.getActions()[0];

    expect(action.type).toEqual(requestAuthentication.type);
    expect(action.payload).toEqual({
      authenticationRequired: true,
    });
  });
});
