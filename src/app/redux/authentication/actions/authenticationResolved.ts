import { actionCreatorFactory } from '../../actions';

export const authenticationResolved = actionCreatorFactory<{
  success: boolean;
}>('AUTHENTICATION_RESOLVED');
