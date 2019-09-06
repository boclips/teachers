import { Store } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { registerAnalytics } from '../actions/registerAnalytics';

const onRegisterAnalytics = (_: Store, analyticsId: string) => {
  AnalyticsFactory.mixpanel().setUserId(analyticsId);
};

export default sideEffect(registerAnalytics, onRegisterAnalytics);
