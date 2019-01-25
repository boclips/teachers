import { Constants } from '../../app/AppConstants';
import { initializeMixpanel } from './initializeMixpanel';
import MixpanelAnalytics from './MixpanelAnalytics';

const mixpanelAnalytics = new MixpanelAnalytics(
  initializeMixpanel(Constants.ENVIRONMENT),
);

export default class AnalyticsFactory {
  public static getInstance() {
    return mixpanelAnalytics;
  }
}
