import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Store } from 'redux';
import { By } from '../../../test-support/By';
import { MockStoreFactory } from '../../../test-support/factories';
import ConditionalRoute from './ConditionalRoute';

function getComponentWrapper(
  store: Store,
  canBeAnonymous: boolean,
  shouldRenderChildren?: () => boolean,
) {
  return mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <ConditionalRoute
          path="/"
          canBeAnonymous={canBeAnonymous}
          shouldRenderChildren={shouldRenderChildren}
        >
          <span data-qa="restricted-content" />
        </ConditionalRoute>
      </MemoryRouter>
    </Provider>,
  );
}

describe('conditional rendering of children', () => {
  it('will render when it can be anonymous', () => {
    const store = MockStoreFactory.sample({
      authentication: {
        status: 'anonymous',
      },
    });

    const componentWrapper = getComponentWrapper(store, true);

    const content = componentWrapper.find(By.dataQa('restricted-content'));
    expect(content).toExist();
  });

  it('will render when it cannot be anonymous, but is authenticated', () => {
    const store = MockStoreFactory.sample({
      authentication: {
        status: 'authenticated',
      },
    });

    const componentWrapper = getComponentWrapper(store, false);

    const content = componentWrapper.find(By.dataQa('restricted-content'));
    expect(content).toExist();
  });

  it('will not render when it can be anonymous but status is pending', () => {
    const store = MockStoreFactory.sample({
      authentication: {
        status: 'pending',
      },
    });

    const componentWrapper = getComponentWrapper(store, true);

    const content = componentWrapper.find(By.dataQa('restricted-content'));
    expect(content).not.toExist();
  });
  it('will not render when it can be anonymous but should render children returns false', () => {
    const store = MockStoreFactory.sample({
      authentication: {
        status: 'anonymous',
      },
    });

    const componentWrapper = getComponentWrapper(store, true, () => false);

    const content = componentWrapper.find(By.dataQa('restricted-content'));
    expect(content).not.toExist();
  });

  it('will not render when it can not be anonymous but status is anonymous', () => {
    const store = MockStoreFactory.sample({
      authentication: {
        status: 'anonymous',
      },
    });

    const componentWrapper = getComponentWrapper(store, false, () => false);

    const content = componentWrapper.find(By.dataQa('restricted-content'));
    expect(content).not.toExist();
  });
  it('will not render when it can not be anonymous but status is pending', () => {
    const store = MockStoreFactory.sample({
      authentication: {
        status: 'pending',
      },
    });

    const componentWrapper = getComponentWrapper(store, false, () => false);

    const content = componentWrapper.find(By.dataQa('restricted-content'));
    expect(content).not.toExist();
  });

  it('will not render when the status is not set yet', () => {
    const store = MockStoreFactory.sample({});

    const componentWrapper = getComponentWrapper(store, true, () => false);

    const content = componentWrapper.find(By.dataQa('restricted-content'));
    expect(content).not.toExist();
  });
});

describe('requesting authorisation', () => {
  it('does request authentication when component cannot be rendered', () => {
    const store = MockStoreFactory.sample({
      authentication: {
        status: 'pending',
      },
    });

    getComponentWrapper(store, false, () => true);

    expect(store.getActions()).toHaveLength(1);
  });
});
