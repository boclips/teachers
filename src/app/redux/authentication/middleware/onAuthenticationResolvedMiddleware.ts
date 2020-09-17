import { Store } from 'redux';
import { ApiClientWrapper } from 'src/services/apiClient';
import axios from 'axios';
import { Constants } from 'src/app/AppConstants';
import { ApiBoclipsClient } from 'boclips-api-client';
import { userLoggedIn } from '../../../../components/login/redux/actions/userLoggedIn';
import { sideEffect } from '../../actions';
import { successfulAuthentication } from '../actions/successfulAuthentication';
import { failedAuthentication } from 'src/app/redux/authentication/actions/failedAuthentication';

const setUpApiClient = () =>
  ApiClientWrapper.set(ApiBoclipsClient.create(axios, Constants.API_PREFIX));

const onSuccesfulAuthentication = (store: Store) => {
  store.dispatch(userLoggedIn());
  setUpApiClient();
};

const onFailedAuthentication = (_store: Store) => setUpApiClient();

export default [
  sideEffect(successfulAuthentication, onSuccesfulAuthentication),
  sideEffect(failedAuthentication, onFailedAuthentication),
];
