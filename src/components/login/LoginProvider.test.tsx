import { mount } from 'enzyme';
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { By } from '../../../test-support/By';
import { MockStoreFactory } from '../../../test-support/factories';
import LoginProvider from './LoginProvider';

class TestComponent extends PureComponent {
  public render(): React.ReactNode {
    return <span data-qa="restricted-content" />;
  }
}

test('Renders children', () => {
  const wrapper = mount(
    <Provider
      store={MockStoreFactory.sample({
        authentication: {
          status: 'authenticated',
        },
      })}
    >
      <LoginProvider>
        <TestComponent />
      </LoginProvider>
    </Provider>,
  );

  const content = wrapper.find(By.dataQa('restricted-content'));
  expect(content).toExist();
});
