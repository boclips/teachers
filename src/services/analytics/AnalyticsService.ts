import { Constants } from '../../app/AppConstants';
import { EditCollectionRequest } from '../../components/collection/redux/actions/editCollectionAction';
import { Attachment } from '../../types/Attachment';
import {
  CollectionSearchResult,
  VideoSearchResult,
} from '../../types/SearchResults';
import { Segment, Video } from '../../types/Video';
import { VideoCollection } from '../../types/VideoCollection';
import { CreateCollectionRequest } from '../collections/createCollection';
import { UserProfile } from '../users/UserProfile';
import EventTypes from './external/EventTypes';
import { toAppcuesSegment } from './external/toAppcuesSegment';
import { toAppcuesVideo } from './external/toAppcuesVideo';

export default class AnalyticsService {
  private appcuesInstance?: Appcues;

  public constructor(appcues?: Appcues) {
    if (!appcues) {
      console.error('Appcues is not defined');
    }

    this.appcuesInstance = appcues;
  }

  private trackAppcues(event: string, payload: any) {
    if (this.appcuesInstance) {
      this.appcuesInstance.track(event, payload);
    }
  }

  private identifyAppcues(userProfile: UserProfile) {
    if (this.appcuesInstance) {
      this.appcuesInstance.identify(userProfile.id, {
        name: userProfile.firstName,
        email: userProfile.email,
        planType: Constants.APPCUES_PLAN_TYPE,
      });
    }
  }

  public identify(userProfile: UserProfile) {
    this.identifyAppcues(userProfile);
  }

  public trackVideoSearch(searchResults: VideoSearchResult) {
    const type = 'INSTRUCTIONAL';

    const eventPayload = {
      [`${EventTypes.VIDEO_SEARCH}_query`.toLowerCase()]: searchResults.query,
      [`${EventTypes.VIDEO_SEARCH}_number_of_results`.toLowerCase()]:
        searchResults.videos && searchResults.videos.length,
      [`${EventTypes.VIDEO_SEARCH}_page_number`.toLowerCase()]: searchResults
        .paging.number,
      [`${EventTypes.VIDEO_SEARCH}_type`.toLowerCase()]: type,
    };

    this.trackAppcues(EventTypes.VIDEO_SEARCH, eventPayload);
  }

  public trackCollectionSearch(searchResults: CollectionSearchResult) {
    const payload = {
      [`${EventTypes.COLLECTION_SEARCH}_query`.toLowerCase()]: searchResults.query,
      [`${EventTypes.COLLECTION_SEARCH}_number_of_results`.toLowerCase()]:
        searchResults.collections && searchResults.collections.length,
    };

    this.trackAppcues(EventTypes.COLLECTION_SEARCH, payload);
  }

  public trackDiscoveryPage(subjectId?: string[], disciplineId?: string) {
    const payload = {
      subject_id: subjectId ? subjectId : null,
      discipline_id: disciplineId ? disciplineId : null,
    };

    this.trackAppcues(EventTypes.DISCOVER_COLLECTIONS, payload);
  }

  public trackCollectionVisited(collection: VideoCollection): void {
    const payload = {
      video_collection_title: collection.title,
      video_collection_id: collection.id,
      video_collection_is_owner: collection.isMine,
      video_collection_is_public: collection.isPublic,
    };

    this.trackAppcues(EventTypes.DEFAULT_COLLECTION_VISITED, payload);
  }

  public trackCollectionAttachmentLinkVisited(
    collectionId: VideoCollection['id'],
    attachment: Attachment,
  ): void {
    const payload = {
      video_collection_id: collectionId,
      attachment_id: attachment.id,
      attachment_type: attachment.type,
    };

    this.trackAppcues(EventTypes.COLLECTION_ATTACHMENT_VISITED, payload);
  }

  public trackVideoAddedToCollection(
    video: Video,
    collection: VideoCollection,
  ): void {
    const payload = {
      video_collection_title: collection.title,
      video_collection_id: collection.id,
      video_title: video.title,
    };

    this.trackAppcues(EventTypes.VIDEO_ADDED_TO_COLLECTION, payload);
  }

  public trackCollectionCreated(request: CreateCollectionRequest): void {
    const payload = {
      collection_title: request.title,
    };

    this.trackAppcues(EventTypes.COLLECTION_CREATED, payload);
  }

  public trackCollectionRenamed(request: EditCollectionRequest): void {
    const payload = {
      collection_title: request.changes.title,
      collection_id: request.collection.id,
    };

    this.trackAppcues(EventTypes.COLLECTION_RENAMED, payload);
  }

  public trackCollectionVisiblityChange(request: EditCollectionRequest): void {
    const payload = {
      collection_visibility: request.changes.isPublic,
      collection_id: request.collection.id,
    };

    this.trackAppcues(EventTypes.VISIBILITY_CHANGED, payload);
  }

  public trackCollectionRemoved(collection: VideoCollection): void {
    const payload = {
      collection_title: collection.title,
      collection_id: collection.id,
    };

    this.trackAppcues(EventTypes.COLLECTION_REMOVED, payload);
  }

  public trackCollectionBookmarked(collection: VideoCollection): void {
    const payload = {
      collection_title: collection.title,
      collection_id: collection.id,
    };

    this.trackAppcues(EventTypes.COLLECTION_BOOKMARKED, payload);
  }

  public trackCollectionUnbookmarked(collection: VideoCollection): void {
    const payload = {
      collection_title: collection.title,
      collection_id: collection.id,
    };

    this.trackAppcues(EventTypes.COLLECTION_UNBOOKMARKED, payload);
  }

  public trackVideoRemovedFromCollection(
    video: Video,
    collection: VideoCollection,
  ): void {
    const payload = {
      video_collection_title: collection.title,
      video_collection_id: collection.id,
      video_title: video.title,
    };

    this.trackAppcues(EventTypes.VIDEO_REMOVED_FROM_COLLECTION, payload);
  }

  public trackVideoVisited(video: Video): void {
    const payload = {
      ...toAppcuesVideo(video),
    };

    this.trackAppcues(EventTypes.VIDEO_VISITED, payload);
  }

  public trackVideoLinkCopied(video: Video, segment: Segment): void {
    const payload = {
      ...toAppcuesVideo(video),
      share_segment_start: segment?.start,
      share_segment_end: segment?.end,
    };

    this.trackAppcues(EventTypes.VIDEO_LINK_COPIED, payload);
  }

  public trackVideoSharedInGoogle(video: Video, segment: Segment): void {
    const payload = {
      ...toAppcuesVideo(video),
      share_segment_start: segment?.start,
      share_segment_end: segment?.end,
    };

    this.trackAppcues(EventTypes.VIDEO_SHARED_GOOGLE_CLASSROOM, payload);
  }

  public trackVideoPlayback(
    video: Video,
    startSeconds: number,
    endSeconds: number,
  ): void {
    const payload = {
      ...toAppcuesVideo(video),
      ...toAppcuesSegment(video, startSeconds, endSeconds),
    };
    this.trackAppcues(EventTypes.VIDEO_PLAYBACK, payload);
  }

  public trackVideoRatingModalOpened() {
    this.trackAppcues(EventTypes.VIDEO_RATING_MODAL_OPENED, undefined);
  }

  public trackMoreCollectionsLoaded(typeOfCollections: any) {
    const payload = {
      type: typeOfCollections,
    };

    this.trackAppcues(EventTypes.MORE_COLLECTIONS_LOADED, payload);
  }

  public trackSearchFiltersApplied(formData: any) {
    this.trackAppcues(EventTypes.SEARCH_FILTERS_APPLIED, formData);
  }

  public trackMyCollectionsNavbarButtonClicked() {
    this.trackAppcues(
      EventTypes.MY_COLLECTIONS_NAVBAR_BUTTON_CLICKED,
      undefined,
    );
  }

  public trackCollectionsNavbarButtonClicked() {
    this.trackAppcues(EventTypes.COLLECTIONS_NAVBAR_BUTTON_CLICKED, undefined);
  }

  public trackOnboardingStarted() {
    this.trackAppcues(EventTypes.ONBOARDING_STARTED, undefined);
  }

  public trackOnboardingCompleted() {
    this.trackAppcues(EventTypes.ACTIVATION_COMPLETE, undefined);
    this.trackAppcues(EventTypes.ONBOARDING_COMPLETED, undefined);
  }

  public trackOnboardingPageChanged(pageIndex: number) {
    const payload = {
      page_index: pageIndex,
    };

    this.trackAppcues(EventTypes.ONBOARDING_PAGE_CHANGED, payload);
  }

  public pageChange() {
    if (this.appcuesInstance) {
      this.appcuesInstance.page();
    }
  }
}
