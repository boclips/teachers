import { actionCreatorFactory } from '../../actions';

export const requestAuthentication = actionCreatorFactory<{
  authenticationRequired: boolean;
}>('REQUEST_AUTHENTICATION');
