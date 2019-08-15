import React from 'react';
import ConditionalRoute from './ConditionalRoute';

export const PublicRoute = props => (
  <ConditionalRoute {...props} canBeAnonymous={true} />
);
