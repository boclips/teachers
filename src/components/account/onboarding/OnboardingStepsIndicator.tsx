import React from 'react';

interface Props {
  page: number;
  total: number;
}

export const OnboardingStepsIndicator = ({ page, total }: Props) => {
  return (
    <span key={`counter-${page}`} className="onboarding-form__page-count">
      {page + 1} of {total}
    </span>
  );
};
