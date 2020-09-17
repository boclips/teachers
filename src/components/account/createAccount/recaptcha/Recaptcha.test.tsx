import { mount } from 'enzyme';
import * as React from 'react';
import { ReCaptcha } from 'react-recaptcha-v3';
import { Props, Recaptcha } from './Recaptcha';

describe('Recaptcha', () => {
  // eslint-disable-next-line
  const getComponent = (props: Props) => mount(<Recaptcha {...props} />);

  it('Configures the Recaptcha component', () => {
    const verifyCallback = (_) => jest.fn();
    const component = getComponent({
      verifyCallback,
    });

    const childRecaptcha = component.find(ReCaptcha);

    expect(childRecaptcha.prop('sitekey')).toBe(
      'awesome-key-set-in-test-setup',
    );
    expect(childRecaptcha.prop('action')).toBe('registration');
    expect(childRecaptcha.prop('verifyCallback')).toBe(verifyCallback);
  });
});
