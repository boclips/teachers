import { Form } from 'antd';
import { mount } from 'enzyme';
import * as React from 'react';
import { By } from '../../../../test-support/By';
import EventSimulator from '../../../../test-support/EventSimulator';
import { PasswordForm } from './PasswordForm';

const validPassword = 'Aa123456';

describe('PasswordForm', () => {
  const Password = Form.create({ name: 'register' })(PasswordForm);
  let events: EventSimulator;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Password />);
    events = new EventSimulator(wrapper);
  });

  describe('when just mounted', () => {
    it('renders just fine', () => {
      expect(wrapper.find(By.dataQa('password'))).toExist();
    });

    it('does not render password rules', () => {
      expect(wrapper.find(By.dataQa('password-rule'))).not.toExist();
    });

    it('renders password as password input', () => {
      expect(wrapper.find(By.dataQa('password', 'Input'))).toHaveProp(
        'type',
        'password',
      );
    });
  });

  describe('showing password', () => {
    beforeEach(() => {
      events.click(wrapper.find(By.dataQa('show-password')));
    });

    it('changes password type to text', () => {
      expect(wrapper.find(By.dataQa('password', 'Input'))).toHaveProp(
        'type',
        'text',
      );
    });
  });

  describe('when password typed', () => {
    it('renders password rules', () => {
      events.setText('0', wrapper.find(By.dataQa('password', 'input')));

      expect(wrapper.find(By.dataQa('password-rule'))).toExist();
    });
  });

  describe('validation', () => {
    it('validates good password removing validation warnings', () => {
      events.setText(
        validPassword,
        wrapper.find(By.dataQa('password', 'input')),
      );

      expect(wrapper.find(By.dataQa('password-error'))).not.toExist();
      expect(wrapper.find(By.dataQa('password-success'))).not.toExist();
    });

    it('validates short password', () => {
      events.setText('Aa123', wrapper.find(By.dataQa('password', 'input')));

      expect(wrapper.find(By.dataQa('password-error'))).toHaveLength(1);
      expect(wrapper.find(By.dataQa('password-success'))).toHaveLength(3);
    });

    it('validates password without uppercase', () => {
      events.setText(
        validPassword.toLocaleLowerCase(),
        wrapper.find(By.dataQa('password', 'input')),
      );

      expect(wrapper.find(By.dataQa('password-error'))).toHaveLength(1);
      expect(wrapper.find(By.dataQa('password-success'))).toHaveLength(3);
    });

    it('validates password without lowercase', () => {
      events.setText(
        validPassword.toLocaleUpperCase(),
        wrapper.find(By.dataQa('password', 'input')),
      );

      expect(wrapper.find(By.dataQa('password-error'))).toHaveLength(1);
      expect(wrapper.find(By.dataQa('password-success'))).toHaveLength(3);
    });

    it('validates password without numbers', () => {
      events.setText('AAAaaaaaa', wrapper.find(By.dataQa('password', 'input')));

      expect(wrapper.find(By.dataQa('password-error'))).toHaveLength(1);
      expect(wrapper.find(By.dataQa('password-success'))).toHaveLength(3);
    });
  });
});
