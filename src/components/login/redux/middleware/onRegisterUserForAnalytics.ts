import { Store } from 'redux';
import { Constants } from '../../../../app/AppConstants';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { UserProfile } from '../../../../services/users/UserProfile';
import { registerUserForAnalytics } from '../actions/registerUserForAnalytics';

const identifyUsers = (_: Store, user: UserProfile) => {
  window.Appcues.identify(user.id, {
    name: user.firstName,
    email: user.email,
    planType: Constants.ENVIRONMENT,
  });
  AnalyticsFactory.mixpanel().identify(user.analyticsId);
};

export default sideEffect(registerUserForAnalytics, identifyUsers);
