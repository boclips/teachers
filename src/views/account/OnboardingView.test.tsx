import React from 'react';
import { mount } from 'enzyme';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
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

describe(`when user is not activated`, () => {
  it(`should send an onboarding page 1 started event on load`, async () => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
    const noOp = () => {};

    mount(
      <OnboardingViewComponent
        userCanActivate={true}
        redirectToHomepage={noOp}
      />,
    );

    expect(client.events.getEvents()).toEqual([
      {
        anonymous: true,
        subtype: 'ONBOARDING_PAGE_1_STARTED',
        type: 'PLATFORM_INTERACTED_WITH',
      },
    ]);
  });
});
