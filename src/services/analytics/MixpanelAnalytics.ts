import mixpanel from 'mixpanel-browser';
import { SearchRequest } from '../../types/SearchRequest';
import { SearchResults } from '../../types/State';
import { Video } from '../../types/Video';
import Analytics from './Analytics';

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

  public trackAccountActivation() {
    this.mixpanelInstance.track(EventTypes.ACTIVATION_COMPLETE);
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

  public trackDefaultCollectionVisited(): void {
    this.mixpanelInstance.track(EventTypes.DEFAULT_COLLECTION_VISITED, {
      video_collection_id: 'DEFAULT',
    });
  }

  public trackVideoAddedToDefaultCollection(): void {
    this.mixpanelInstance.track(EventTypes.VIDEO_ADDED_TO_COLLECTION, {
      video_collection_id: 'DEFAULT',
    });
  }

  public trackVideoRemovedFromDefaultCollection(): void {
    this.mixpanelInstance.track(EventTypes.VIDEO_REMOVED_FROM_COLLECTION, {
      video_collection_id: 'DEFAULT',
    });
  }

  public trackVideoVisited(video: Video): void {
    this.mixpanelInstance.track(EventTypes.VIDEO_VISITED, {
      ...this.toMixpanelVideo(video),
    });
  }

  public trackVideoLinkCopied(video: Video): void {
    this.mixpanelInstance.track(EventTypes.VIDEO_LINK_COPIED, {
      ...this.toMixpanelVideo(video),
    });
  }

  private toMixpanelVideo(video: Video) {
    return {
      video_id: video.id,
      video_title: video.title,
      video_description: video.description,
      video_duration: video.duration.toISOString(),
      video_releasedOn: video.releasedOn.toISOString(),
      video_contentPartner: video.contentPartner,
      video_subjects: video.subjects.join(', '),
      video_playback: video.playback,
      video_badges: video.badges.join(', '),
    };
  }
}

enum EventTypes {
  ACTIVATION_COMPLETE = 'ACTIVATION_COMPLETE',
  VIDEO_SEARCH = 'VIDEO_SEARCH',
  VIDEO_VISITED = 'VIDEO_VISITED',
  VIDEO_LINK_COPIED = 'VIDEO_LINK_COPIED',
  VIDEO_ADDED_TO_COLLECTION = 'COLLECTION_VIDEO_ADDED',
  VIDEO_REMOVED_FROM_COLLECTION = 'COLLECTION_VIDEO_REMOVED',
  DEFAULT_COLLECTION_VISITED = 'COLLECTION_VISITED',
}

export interface UserProfile {
  authenticated: boolean;
  email: string;
  firstName: string;
  lastName: string;
}
