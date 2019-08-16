import { actionCreatorFactory } from '../../actions';

export const authenticationChanged = actionCreatorFactory<{
  success: boolean;
}>('AUTHENTICATION_CHANGED');
