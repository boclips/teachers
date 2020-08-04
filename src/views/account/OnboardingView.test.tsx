import React from 'react';
import { mount } from 'enzyme';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { Provider } from 'react-redux';
import { MockStoreFactory } from 'test-support/factories';
import { OnboardingViewComponent } from './OnboardingView';

const timeoutForFullOnboarding = 10000;
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

describe('when user is not activated', () => {
  it(
    'should send an onboarding page 1 started event on load',
    async () => {
      mount(
        <Provider store={MockStoreFactory.sample()}>
          <OnboardingViewComponent
            userCanActivate
            redirectToHomepage={jest.fn()}
          />
        </Provider>,
      );
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;

      expect(client.events.getEvents()).toEqual([
        {
          anonymous: true,
          subtype: 'ONBOARDING_PAGE_1_STARTED',
          type: 'PLATFORM_INTERACTED_WITH',
        },
      ]);
    },
    timeoutForFullOnboarding,
  );
});
