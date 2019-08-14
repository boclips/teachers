import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Store } from 'redux';
import { By } from '../../../test-support/By';
import { MockStoreFactory } from '../../../test-support/factories';
import { requestAuthentication } from '../../app/redux/authentication/actions/requestAuthentication';
import PrivateRoute from './PrivateRoute';

describe('conditional rendering of components', () => {
  it('does render a component when authentication is complete', () => {
    const wrapper = render(
      MockStoreFactory.sample({
        authentication: {
          status: 'authenticated',
        },
      }),
    );

    const content = wrapper.find(By.dataQa('restricted-content'));
    expect(content).toExist();
  });

  it('does render children when authentication is complete', () => {
    const wrapper = mount(
      <Provider
        store={MockStoreFactory.sample({
          authentication: {
            status: 'authenticated',
          },
        })}
      >
        <MemoryRouter initialEntries={['/']}>
          <PrivateRoute path="/">
            <TestComponent />
          </PrivateRoute>
        </MemoryRouter>
      </Provider>,
    );

    const content = wrapper.find(By.dataQa('restricted-content'));
    expect(content).toExist();
  });

  it('does not render when authentication is pending', () => {
    const wrapper = render(
      MockStoreFactory.sample({
        authentication: {
          status: 'pending',
        },
      }),
    );

    const content = wrapper.find(By.dataQa('restricted-content'));
    expect(content).not.toExist();
  });
  it('does not render when authentication is anonymous', () => {
    const wrapper = render(
      MockStoreFactory.sample({
        authentication: {
          status: 'anonymous',
        },
      }),
    );

    const content = wrapper.find(By.dataQa('restricted-content'));
    expect(content).not.toExist();
  });
});

it('should dispatch a request for authentication on mount when not authenticated', () => {
  const store = MockStoreFactory.sample({
    authentication: {
      status: 'pending',
    },
  });

  render(store);

  expect(store.getActions()).toHaveLength(1);
  const requestAction = store.getActions()[0];

  expect(requestAction.type).toEqual(requestAuthentication.type);
  expect(requestAction.payload).toEqual({ authenticationRequired: true });
});

const TestComponent = () => <span data-qa="restricted-content" />;

function render(store: Store<any>) {
  return mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <PrivateRoute path="/" component={TestComponent} />
      </MemoryRouter>
    </Provider>,
  );
}
