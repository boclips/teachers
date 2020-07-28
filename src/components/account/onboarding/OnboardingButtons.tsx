import { Button } from 'antd';
import React from 'react';

interface Props {
  page: number;
  numberOfPages: number;
  stepBack: () => void;
  stepForward: () => void;
}
export const OnboardingButtons = (props: Props) => {
  const { page, numberOfPages, stepBack, stepForward } = props;
  const hasPreviousPage = () => page > 0;
  const onLastPage = () => page === numberOfPages - 1;
  return (
    <>
      {hasPreviousPage() && (
        <BaseButton label="Back" onClick={stepBack} htmlType="button" />
      )}
      {onLastPage() ? (
        <BaseButton label="Finish" primary htmlType="submit" />
      ) : (
        <BaseButton
          label="Next"
          primary
          htmlType="button"
          onClick={stepForward}
        />
      )}
    </>
  );
};

interface BaseButtonProps {
  label: string;
  primary?: boolean;
  onClick?: () => void;
  htmlType: 'button' | 'submit';
}
const BaseButton = (props: BaseButtonProps) => {
  const { label, primary, onClick, htmlType } = props;
  return (
    <Button
      className={primary ? 'onboarding-form__primary' : 'onboarding-form__back'}
      size="large"
      type={primary ? 'primary' : 'default'}
      onClick={onClick}
      htmlType={htmlType}
    >
      {label}
    </Button>
  );
};
