import * as Sentry from '@sentry/browser';
import { Severity } from '@sentry/browser';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { Action } from 'redux';

const handleLocationChangeAction = ({ payload }: LocationChangeAction) => {
  Sentry.addBreadcrumb({
    category: 'router',
    level: Severity.Info,
    message: `Location changed: ${JSON.stringify(payload.location)}`,
  });
};

// noinspection JSUnusedLocalSymbols
export const sentryBreadcrumbMiddleware = _ => next => (action: Action) => {
  if (process.env.NODE_ENV === 'production') {
    if (action.type === LOCATION_CHANGE) {
      handleLocationChangeAction(action as LocationChangeAction);
    }
  }
  next(action);
};
