import { Store } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { UserProfile } from '../../../../services/users/UserProfile';
import { registerUserForAnalytics } from '../actions/registerUserForAnalytics';

const identifyUsers = (_: Store, user: UserProfile) => {
  AnalyticsFactory.externalAnalytics().identify(user);
};

export default sideEffect(registerUserForAnalytics, identifyUsers);
