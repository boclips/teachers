import { Store } from 'redux';
import { Constants } from '../../../../app/AppConstants';
import { sideEffect } from '../../../../app/redux/actions';
import { UserProfile } from '../../../../services/users/UserProfile';
import { registerAppcues } from '../actions/registerAppcues';

const registerUserOnAppcues = (_: Store, user: UserProfile) => {
  window.Appcues.identify(user.id, {
    name: user.firstName,
    email: user.email,
    planType: Constants.ENVIRONMENT,
  });
};

export default sideEffect(registerAppcues, registerUserOnAppcues);
