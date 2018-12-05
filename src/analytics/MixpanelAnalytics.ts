import mixpanel from 'mixpanel-browser';
import Analytics, { EventTypes } from './Analytics';

export default class MixpanelAnalytics implements Analytics {
  private static instance: MixpanelAnalytics;

  private mixpanelInstance: Mixpanel;
  private stagingHost = '.staging-boclips.com';
  private productionHost = '.boclips.com';
  private testingToken = '70f2ae29eaa67a0e93513c2f0d86c94b';
  private stagingToken = '4290d60e0956507222103ffd8cdfad35';
  private productionToken = '5695e44d19f62e9c99c37d6ea0e11d85';

  private constructor() {
    mixpanel.init(this.selectToken(), {}, 'educators');
    this.mixpanelInstance = mixpanel.educators;
  }

  public static getInstance(): MixpanelAnalytics {
    return this.instance || (this.instance = new this());
  }

  private selectToken() {
    const hostname = window.location.hostname.toLowerCase();
    let mixpanelToken;
    if (hostname.search(this.stagingHost) >= 0) {
      mixpanelToken = this.stagingToken;
    } else if (hostname.search(this.productionHost) >= 0) {
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
