import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import { MockStoreFactory, UserProfileFactory } from 'test-support/factories';
import FeatureGate from 'src/components/common/featuresFlags/FeatureGate';
import React from 'react';

describe(`FeatureGate`, () => {
  it(`renders the child component when the user has the feature`, () => {
    const wrapper = renderWithBoclipsStore(
      <FeatureGate flag="TEACHERS_HOME_BANNER">
        <div>Hello world</div>
      </FeatureGate>,
      MockStoreFactory.sampleState({
        user: UserProfileFactory.sample({
          features: { TEACHERS_HOME_BANNER: true },
        }),
      }),
    );

    expect(wrapper.getByText('Hello world')).toBeInTheDocument();
  });

  it('does not render component when user does not have feature enabled', async () => {
    const wrapper = renderWithBoclipsStore(
      <FeatureGate flag="TEACHERS_HOME_BANNER">
        <div>Hello world</div>
      </FeatureGate>,
      MockStoreFactory.sampleState({
        user: UserProfileFactory.sample({
          features: { TEACHERS_SUBJECTS: true, TEACHERS_HOME_BANNER: false },
        }),
      }),
    );

    expect(await wrapper.queryByText('Hello world')).toBeNull();
  });
});
