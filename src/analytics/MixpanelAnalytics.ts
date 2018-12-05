import mixpanel from 'mixpanel-browser';
import Analytics, { EventTypes } from './Analytics';

export default class MixpanelAnalytics implements Analytics {
  private static instance: MixpanelAnalytics;

  private mixpanelInstance: Mixpanel;
  private static stagingHost = '.staging-boclips.com';
  private static productionHost = '.boclips.com';
  public static testingToken = '70f2ae29eaa67a0e93513c2f0d86c94b';
  public static stagingToken = '4290d60e0956507222103ffd8cdfad35';
  public static productionToken = '5695e44d19f62e9c99c37d6ea0e11d85';

  private constructor() {
    mixpanel.init(
      MixpanelAnalytics.selectToken(window.location.hostname.toLowerCase()),
      {},
      'educators',
    );
    this.mixpanelInstance = mixpanel.educators;
  }

  public static getInstance(): MixpanelAnalytics {
    return this.instance || (this.instance = new this());
  }

  public static selectToken(hostname: string) {
    let mixpanelToken;
    if (hostname.indexOf(this.stagingHost) !== -1) {
      mixpanelToken = this.stagingToken;
    } else if (hostname.indexOf(this.productionHost) !== -1) {
      mixpanelToken = this.productionToken;
    } else {
      mixpanelToken = this.testingToken;
    }
    return mixpanelToken;
  }

  public publish(event: EventTypes) {
    this.mixpanelInstance.track(event.toString());
  }
}
