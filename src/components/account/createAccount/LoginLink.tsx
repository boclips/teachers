import React from 'react';
import { Link } from 'react-router-dom';

export const LoginLink = () => {
  return (
    <p className="create-account-form__existing">
      Already have an account? <Link to="/">Login</Link>
    </p>
  );
};
