import React from 'react';
import { OnboardingSectionAttributes } from 'src/components/account/onboarding/OnboardingFormValues';

interface Props {
  section: OnboardingSectionAttributes;
}
export const OnboardingIllustration = (props: Props) => (
  <img
    src={props.section.illustrationSrc}
    className="onboarding__logo"
    alt=""
  />
);
