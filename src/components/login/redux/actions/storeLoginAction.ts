import { KeycloakInstance } from 'keycloak-js';
import { actionCreatorFactory } from '../../../../app/redux/actions';

export const storeLogin = actionCreatorFactory<KeycloakInstance>('STORE_LOGIN');
