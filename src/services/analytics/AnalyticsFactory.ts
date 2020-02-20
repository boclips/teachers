import { Constants } from '../../app/AppConstants';
import AnalyticsService from './AnalyticsService';
import boclipsAnalytics, { BoclipsAnalytics } from './boclips/BoclipsAnalytics';
import { initializeMixpanel } from './external/initializeMixpanel';

const analyticsService = new AnalyticsService(
  initializeMixpanel(Constants.ENVIRONMENT),
  window.Appcues,
);

export default class AnalyticsFactory {
  public static externalAnalytics(): AnalyticsService {
    return analyticsService;
  }

  public static internalAnalytics(): BoclipsAnalytics {
    return boclipsAnalytics;
  }
}
