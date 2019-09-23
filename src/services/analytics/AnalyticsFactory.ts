import { Constants } from '../../app/AppConstants';
import boclipsAnalytics, { BoclipsAnalytics } from './boclips/BoclipsAnalytics';
import { initializeMixpanel } from './mixpanel/initializeMixpanel';
import MixpanelAnalytics from './mixpanel/MixpanelAnalytics';

const mixpanelAnalytics = new MixpanelAnalytics(
  initializeMixpanel(Constants.ENVIRONMENT),
  window.Appcues,
);

export default class AnalyticsFactory {
  public static mixpanel(): MixpanelAnalytics {
    return mixpanelAnalytics;
  }

  public static boclips(): BoclipsAnalytics {
    return boclipsAnalytics;
  }
}
