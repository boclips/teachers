import React from 'react';
import { mount } from 'enzyme';
import { OnboardingViewComponent } from './OnboardingView';

describe('When user is activated', () => {
  it('should redirect the user to the homepage', () => {
    const redirectToHomepageSpy = jest.fn();
    const wrapper = mount(
      <OnboardingViewComponent
        userCanActivate={false}
        redirectToHomepage={redirectToHomepageSpy}
      />,
    );

    expect(wrapper.text()).not.toContain(
      'we’d like to get to know you a bit better to help you get the most out of Boclips',
    );
    expect(redirectToHomepageSpy).toHaveBeenCalled();
  });
});
