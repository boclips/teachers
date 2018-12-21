import { mount } from 'enzyme';
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { By } from '../../../test-support/By';
import { LoginState } from '../../redux/State';
import LoginProvider from './LoginProvider';

const mockStore = configureStore<LoginState>();
jest.mock('boclips-js-security');

class TestComponent extends PureComponent {
  public render(): React.ReactNode {
    return <span data-qa="restricted-content" />;
  }
}

test('Renders children', () => {
  const wrapper = mount(
    <Provider store={mockStore({ login: undefined })}>
      <LoginProvider>
        <TestComponent />
      </LoginProvider>
    </Provider>,
  );

  const content = wrapper.find(By.dataQa('restricted-content'));
  expect(content).toExist();
});
