import { mount } from 'enzyme';
import * as React from 'react';
import { ReCaptcha } from 'react-recaptcha-v3';
import { Props, Recaptcha } from './Recaptcha';

describe('Recaptcha', () => {
  const getComponent = (props: Props) => mount(<Recaptcha {...props} />);

  it('Configures the Recaptcha component', () => {
    const verifyCallback = token => console.log(token);
    const component = getComponent({
      verifyCallback,
    });

    const childRecaptcha = component.find(ReCaptcha);

    expect(childRecaptcha.prop('sitekey')).toBe(
      '6Ldi6JwUAAAAACMgLoshiwBEZNDmnllXrAEIMN_y',
    );
    expect(childRecaptcha.prop('action')).toBe('registration');
    expect(childRecaptcha.prop('verifyCallback')).toBe(verifyCallback);
  });
});
