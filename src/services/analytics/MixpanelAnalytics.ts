import mixpanel from 'mixpanel-browser';
import Analytics, { EventTypes } from './Analytics';
import { SearchRequest } from '../../types/SearchRequest';
import { SearchResults } from '../../types/State';

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
    );
    this.mixpanelInstance = mixpanel;
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

  public publish(event: EventTypes, properties?: { [index: string]: any }) {
    this.mixpanelInstance.track(event.toString(), properties);
  }

  public setUserId(userId: string) {
    this.mixpanelInstance.identify(userId);
  }

  public createUserProfile(userProfile: UserProfile) {
    this.mixpanelInstance.people.set({
      $email: userProfile.email,
      $last_login: new Date(),
      $first_name: userProfile.firstName,
      $last_name: userProfile.lastName,
      $created: new Date(),
    });
  }

  public trackSearch(
    searchRequest: SearchRequest,
    searchResults: SearchResults,
  ) {
    let type;
    const isNewsExcluded = searchRequest.filters.excludeTags.find(item => {
      return item.toLowerCase() === 'news';
    });
    if (isNewsExcluded) {
      type = 'INSTRUCTIONAL';
    } else {
      type = 'NEWS';
    }

    this.mixpanelInstance.track(EventTypes.VIDEO_SEARCH, {
      [`${EventTypes.VIDEO_SEARCH}_query`.toLowerCase()]: searchResults.query,
      [`${EventTypes.VIDEO_SEARCH}_number_of_results`.toLowerCase()]:
        searchResults.videos && searchResults.videos.length,
      [`${EventTypes.VIDEO_SEARCH}_page_number`.toLowerCase()]: searchResults
        .paging.number,
      [`${EventTypes.VIDEO_SEARCH}_type`.toLowerCase()]: type,
    });
  }
}

export interface UserProfile {
  authenticated: boolean;
  email: string;
  firstName: string;
  lastName: string;
}
