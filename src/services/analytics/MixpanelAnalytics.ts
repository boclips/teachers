import SegmentWatchedEvent from 'boclips-react-player/dist/src/SegmentWatchedEvent';
import { EditCollectionRequest } from '../../components/collection/redux/actions/editCollectionAction';
import { SearchRequest } from '../../types/SearchRequest';
import { SearchResults } from '../../types/State';
import { Video } from '../../types/Video';
import { VideoCollection } from '../../types/VideoCollection';
import { CreateCollectionRequest } from '../collections/createCollection';
import EventTypes from './EventTypes';
import { toMixpanelSegment } from './toMixpanelSegment';
import { toMixpanelVideo } from './toMixpanelVideo';
import { UserProfile } from './UserProfile';

export default class MixpanelAnalytics {
  private mixpanelInstance: Mixpanel;

  public constructor(mixpanel: Mixpanel) {
    if (mixpanel === undefined) {
      throw Error('Mixpanel is undefined');
    }

    this.mixpanelInstance = mixpanel;
  }

  public setUserId(userId: string) {
    this.mixpanelInstance.identify(userId);
  }

  public reset() {
    this.mixpanelInstance.reset();
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

  public getId(): string {
    return this.mixpanelInstance.get_distinct_id();
  }

  public trackAccountActivation() {
    this.mixpanelInstance.track(EventTypes.ACTIVATION_COMPLETE);
  }

  public trackAccountRegistration(): any {
    this.mixpanelInstance.track(EventTypes.REGISTRATION_INITIATED);
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

  public trackCollectionVisited(collection: VideoCollection): void {
    this.mixpanelInstance.track(EventTypes.DEFAULT_COLLECTION_VISITED, {
      video_collection_title: collection.title,
      video_collection_id: collection.id,
    });
  }

  public trackMyCollectionsVisited(): void {
    this.mixpanelInstance.track(EventTypes.MY_COLLECTIONS_VISITED);
  }

  public trackVideoAddedToCollection(
    video: Video,
    collection: VideoCollection,
  ): void {
    this.mixpanelInstance.track(EventTypes.VIDEO_ADDED_TO_COLLECTION, {
      video_collection_title: collection.title,
      video_collection_id: collection.id,
      video_title: video.title,
    });
  }

  public trackCollectionCreated(request: CreateCollectionRequest): void {
    this.mixpanelInstance.track(EventTypes.COLLECTION_CREATED, {
      collection_title: request.title,
    });
  }

  public trackCollectionRenamed(request: EditCollectionRequest): void {
    this.mixpanelInstance.track(EventTypes.COLLECTION_RENAMED, {
      collection_title: request.title,
      collection_id: request.originalCollection.id,
    });
  }

  public trackCollectionVisiblityChange(request: EditCollectionRequest): void {
    this.mixpanelInstance.track(EventTypes.VISIBILITY_CHANGED, {
      collection_visibility: request.isPublic,
      collection_id: request.originalCollection.id,
    });
  }

  public trackCollectionRemoved(collection: VideoCollection): void {
    this.mixpanelInstance.track(EventTypes.COLLECTION_REMOVED, {
      collection_title: collection.title,
      collection_id: collection.id,
    });
  }

  public trackVideoRemovedFromCollection(
    video: Video,
    collection: VideoCollection,
  ): void {
    this.mixpanelInstance.track(EventTypes.VIDEO_REMOVED_FROM_COLLECTION, {
      video_collection_title: collection.title,
      video_collection_id: collection.id,
      video_title: video.title,
    });
  }

  public trackVideoVisited(video: Video): void {
    this.mixpanelInstance.track(EventTypes.VIDEO_VISITED, {
      ...toMixpanelVideo(video),
    });
  }

  public trackVideoLinkCopied(video: Video): void {
    this.mixpanelInstance.track(EventTypes.VIDEO_LINK_COPIED, {
      ...toMixpanelVideo(video),
    });
  }

  public trackVideoPlayback(
    video: Video,
    watchedSegment: SegmentWatchedEvent,
  ): void {
    this.mixpanelInstance.track(EventTypes.VIDEO_PLAYBACK, {
      ...toMixpanelVideo(video),
      ...toMixpanelSegment(watchedSegment),
    });
  }
}
