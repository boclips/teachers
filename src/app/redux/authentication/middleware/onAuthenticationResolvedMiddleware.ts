import { Store } from 'redux';
import { ApiClientWrapper } from 'src/services/apiClient';
import axios from 'axios';
import { Constants } from 'src/app/AppConstants';
import { ApiBoclipsClient } from 'boclips-api-client';
import { userLoggedIn } from '../../../../components/login/redux/actions/userLoggedIn';
import { sideEffect } from '../../actions';
import { authenticationResolved } from '../actions/authenticationResolved';

const onAuthenticationResolved = (store: Store, { success }) => {
  if (success) {
    store.dispatch(userLoggedIn());
  }
  ApiClientWrapper.set(ApiBoclipsClient.create(axios, Constants.API_PREFIX));
};

export default sideEffect(authenticationResolved, onAuthenticationResolved);
