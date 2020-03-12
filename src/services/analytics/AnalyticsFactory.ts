import AnalyticsService from './AnalyticsService';
import boclipsAnalytics, { BoclipsAnalytics } from './boclips/BoclipsAnalytics';

const analyticsService = new AnalyticsService(window.Appcues);

export default class AnalyticsFactory {
  public static externalAnalytics(): AnalyticsService {
    return analyticsService;
  }

  public static internalAnalytics(): BoclipsAnalytics {
    return boclipsAnalytics;
  }
}
