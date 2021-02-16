import boclipsAnalytics, { BoclipsAnalytics } from './boclips/BoclipsAnalytics';

export default class AnalyticsFactory {
  public static internalAnalytics(): BoclipsAnalytics {
    return boclipsAnalytics;
  }
}
