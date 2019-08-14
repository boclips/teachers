import { KeycloakInstance } from 'keycloak-js';
import { actionCreatorFactory } from '../../actions';

export const authenticationChanged = actionCreatorFactory<{
  success: boolean;
  // TODO: this can be removed, once the api links come back with a populated profile link.
  keycloakInstance?: KeycloakInstance;
}>('AUTHENTICATION_CHANGED');
