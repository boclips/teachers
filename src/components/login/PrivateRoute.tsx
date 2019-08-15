import React from 'react';
import { UserState } from '../../types/State';
import ConditionalRoute from './ConditionalRoute';

const shouldRenderChildren = (state: UserState) => !!state.user;

export const PrivateRoute = props => (
  <ConditionalRoute
    shouldRenderChildren={shouldRenderChildren}
    canBeAnonymous={false}
    {...props}
  />
);
