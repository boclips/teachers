import MixpanelAnalytics from './MixpanelAnalytics';

export default class AnalyticsFactory {
  public static getInstance() {
    return new MixpanelAnalytics();
  }
}
