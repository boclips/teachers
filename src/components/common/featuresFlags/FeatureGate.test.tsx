import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import { MockStoreFactory, UserProfileFactory } from 'test-support/factories';
import FeatureGate from 'src/components/common/featuresFlags/FeatureGate';
import React from 'react';

describe(`FeatureGate`, () => {
  it(`renders the child component when the user has the feature`, () => {
    const wrapper = renderWithBoclipsStore(
      <FeatureGate flag="USER_DATA_HIDDEN">
        <div>Hello world</div>
      </FeatureGate>,
      MockStoreFactory.sampleState({
        user: UserProfileFactory.sample({
          features: { USER_DATA_HIDDEN: true },
        }),
      }),
    );

    expect(wrapper.getByText('Hello world')).toBeInTheDocument();
  });

  it('does not render component when user does not have feature enabled', async () => {
    const wrapper = renderWithBoclipsStore(
      <FeatureGate flag="USER_DATA_HIDDEN">
        <div>Hello world</div>
      </FeatureGate>,
      MockStoreFactory.sampleState({
        user: UserProfileFactory.sample({
          features: { USER_DATA_HIDDEN: false },
        }),
      }),
    );

    expect(await wrapper.queryByText('Hello world')).toBeNull();
  });

  it(`renders the child component when the user does not have the feature and desired value is false`, () => {
    const wrapper = renderWithBoclipsStore(
      <FeatureGate flag="USER_DATA_HIDDEN" featureAvailableValue={false}>
        <div>Hello world</div>
      </FeatureGate>,
      MockStoreFactory.sampleState({
        user: UserProfileFactory.sample({
          features: { USER_DATA_HIDDEN: false },
        }),
      }),
    );

    expect(wrapper.getByText('Hello world')).toBeInTheDocument();
  });

  it('does not render component when user has feature enabled but desired value is false', async () => {
    const wrapper = renderWithBoclipsStore(
      <FeatureGate flag="USER_DATA_HIDDEN" featureAvailableValue={false}>
        <div>Hello world</div>
      </FeatureGate>,
      MockStoreFactory.sampleState({
        user: UserProfileFactory.sample({
          features: { USER_DATA_HIDDEN: true },
        }),
      }),
    );

    expect(await wrapper.queryByText('Hello world')).toBeNull();
  });
});
