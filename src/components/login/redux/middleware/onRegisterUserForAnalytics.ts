import { Store } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { UserProfile } from 'src/services/users/UserProfile';
import { registerUserForAnalytics } from '../actions/registerUserForAnalytics';

const identifyUsers = (_: Store, user: UserProfile) => {
  AnalyticsFactory.externalAnalytics().identify(user);
};

export default sideEffect(registerUserForAnalytics, identifyUsers);
