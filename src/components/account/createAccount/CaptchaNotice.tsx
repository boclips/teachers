import React from 'react';

export const CaptchaNotice = () => {
  return (
    <p className="recaptcha-notice">
      This site is protected by reCAPTCHA and the Google{' '}
      <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
      <a href="https://policies.google.com/terms">Terms of Service</a> apply.
    </p>
  );
};
