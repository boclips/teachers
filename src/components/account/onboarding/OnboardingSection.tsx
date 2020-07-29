import React from 'react';
import {
  ScreenReaderError,
  ScreenReaderErrors,
} from 'src/components/common/a11y/ScreenReaderErrors';
import { OnboardingSectionAttributes } from 'src/components/account/onboarding/OnboardingFormValues';

interface Props {
  section: OnboardingSectionAttributes;
  screenReaderErrors?: ScreenReaderError[];
  children?: React.ReactElement | React.ReactElement[];
  visibleIndex: number;
}
export const OnboardingSection = (props: Props) => {
  const { children, section, screenReaderErrors, visibleIndex } = props;
  return (
    <section
      hidden={section.pageIndex !== visibleIndex}
      data-qa={`onboarding-section-${section.pageIndex}`}
    >
      <h1 className="alt onboarding-form__title big-title">{section.title}</h1>
      <p className="onboarding-form__text">{section.description}</p>
      {screenReaderErrors && <ScreenReaderErrors errors={screenReaderErrors} />}
      {children}
      {section.hasRequiredFields && (
        <p className="onboarding-form__notes">
          <span className="onboarding-form__asterisk">*</span> Required field
        </p>
      )}
    </section>
  );
};
