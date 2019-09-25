import { EditCollectionRequest } from '../../components/collection/redux/actions/editCollectionAction';
import { Attachment } from '../../types/Attachment';
import { CollectionSearchResults, VideoSearchResults } from '../../types/State';
import { Tag } from '../../types/Tag';
import { Segment, Video } from '../../types/Video';
import { VideoCollection } from '../../types/VideoCollection';
import { VideoSearchRequest } from '../../types/VideoSearchRequest';
import { CreateCollectionRequest } from '../collections/createCollection';
import { UserProfile } from '../users/UserProfile';
import EventTypes from './external/EventTypes';
import { toMixpanelSegment } from './external/toMixpanelSegment';
import { toMixpanelVideo } from './external/toMixpanelVideo';

export default class AnalyticsService {
  private mixpanelInstance: Mixpanel;
  private appcuesInstance: Appcues;

  public constructor(mixpanel: Mixpanel, appcues: Appcues) {
    if (mixpanel === undefined) {
      throw Error('Mixpanel is undefined');
    }

    if (appcues === undefined) {
      throw Error('Appcues is undefined');
    }

    this.mixpanelInstance = mixpanel;
    this.appcuesInstance = appcues;
  }

  public identify(userId: string) {
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

  public trackAccountRegistration(): any {
    this.mixpanelInstance.track(EventTypes.REGISTRATION_INITIATED);
  }

  public trackVideoSearch(
    searchRequest: VideoSearchRequest,
    searchResults: VideoSearchResults,
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

    const eventPayload = {
      [`${EventTypes.VIDEO_SEARCH}_query`.toLowerCase()]: searchResults.query,
      [`${EventTypes.VIDEO_SEARCH}_number_of_results`.toLowerCase()]:
        searchResults.videos && searchResults.videos.length,
      [`${EventTypes.VIDEO_SEARCH}_page_number`.toLowerCase()]: searchResults
        .paging.number,
      [`${EventTypes.VIDEO_SEARCH}_type`.toLowerCase()]: type,
    };

    this.appcuesInstance.track(EventTypes.VIDEO_SEARCH, eventPayload);
    this.mixpanelInstance.track(EventTypes.VIDEO_SEARCH, eventPayload);
  }

  public trackCollectionSearch(searchResults: CollectionSearchResults) {
    const payload = {
      [`${
        EventTypes.COLLECTION_SEARCH
      }_query`.toLowerCase()]: searchResults.query,
      [`${EventTypes.COLLECTION_SEARCH}_number_of_results`.toLowerCase()]:
        searchResults.collections && searchResults.collections.length,
    };

    this.mixpanelInstance.track(EventTypes.COLLECTION_SEARCH, payload);
    this.appcuesInstance.track(EventTypes.COLLECTION_SEARCH, payload);
  }

  public trackDiscoveryPage(subjectId?: string[], disciplineId?: string) {
    const payload = {
      subject_id: subjectId ? subjectId : null,
      discipline_id: disciplineId ? disciplineId : null,
    };

    this.mixpanelInstance.track(EventTypes.DISCOVER_COLLECTIONS, payload);
    this.appcuesInstance.track(EventTypes.DISCOVER_COLLECTIONS, payload);
  }

  public trackCollectionVisited(collection: VideoCollection): void {
    const payload = {
      video_collection_title: collection.title,
      video_collection_id: collection.id,
      video_collection_is_owner: collection.isMine,
      video_collection_is_public: collection.isPublic,
    };

    this.mixpanelInstance.track(EventTypes.DEFAULT_COLLECTION_VISITED, payload);
    this.appcuesInstance.track(EventTypes.DEFAULT_COLLECTION_VISITED, payload);
  }

  public trackMyCollectionsVisited(): void {
    this.mixpanelInstance.track(EventTypes.MY_COLLECTIONS_VISITED);
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

    this.mixpanelInstance.track(
      EventTypes.COLLECTION_ATTACHMENT_VISITED,
      payload,
    );

    this.appcuesInstance.track(
      EventTypes.COLLECTION_ATTACHMENT_VISITED,
      payload,
    );
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

    this.mixpanelInstance.track(EventTypes.VIDEO_ADDED_TO_COLLECTION, payload);
    this.appcuesInstance.track(EventTypes.VIDEO_ADDED_TO_COLLECTION, payload);
  }

  public trackCollectionCreated(request: CreateCollectionRequest): void {
    const payload = {
      collection_title: request.title,
    };

    this.mixpanelInstance.track(EventTypes.COLLECTION_CREATED, payload);
    this.appcuesInstance.track(EventTypes.COLLECTION_CREATED, payload);
  }

  public trackCollectionRenamed(request: EditCollectionRequest): void {
    const payload = {
      collection_title: request.title,
      collection_id: request.originalCollection.id,
    };

    this.mixpanelInstance.track(EventTypes.COLLECTION_RENAMED, payload);
    this.appcuesInstance.track(EventTypes.COLLECTION_RENAMED, payload);
  }

  public trackCollectionVisiblityChange(request: EditCollectionRequest): void {
    const payload = {
      collection_visibility: request.isPublic,
      collection_id: request.originalCollection.id,
    };

    this.mixpanelInstance.track(EventTypes.VISIBILITY_CHANGED, payload);
    this.appcuesInstance.track(EventTypes.VISIBILITY_CHANGED, payload);
  }

  public trackCollectionRemoved(collection: VideoCollection): void {
    const payload = {
      collection_title: collection.title,
      collection_id: collection.id,
    };

    this.appcuesInstance.track(EventTypes.COLLECTION_REMOVED, payload);
    this.mixpanelInstance.track(EventTypes.COLLECTION_REMOVED, payload);
  }

  public trackCollectionBookmarked(collection: VideoCollection): void {
    const payload = {
      collection_title: collection.title,
      collection_id: collection.id,
    };

    this.mixpanelInstance.track(EventTypes.COLLECTION_BOOKMARKED, payload);
    this.appcuesInstance.track(EventTypes.COLLECTION_BOOKMARKED, payload);
  }

  public trackCollectionUnbookmarked(collection: VideoCollection): void {
    const payload = {
      collection_title: collection.title,
      collection_id: collection.id,
    };

    this.mixpanelInstance.track(EventTypes.COLLECTION_UNBOOKMARKED, payload);
    this.appcuesInstance.track(EventTypes.COLLECTION_UNBOOKMARKED, payload);
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

    this.mixpanelInstance.track(
      EventTypes.VIDEO_REMOVED_FROM_COLLECTION,
      payload,
    );
    this.appcuesInstance.track(
      EventTypes.VIDEO_REMOVED_FROM_COLLECTION,
      payload,
    );
  }

  public trackVideoVisited(video: Video): void {
    const payload = {
      ...toMixpanelVideo(video),
    };

    this.mixpanelInstance.track(EventTypes.VIDEO_VISITED, payload);
    this.appcuesInstance.track(EventTypes.VIDEO_VISITED, payload);
  }

  public trackVideoLinkCopied(video: Video, segment: Segment): void {
    const payload = {
      ...toMixpanelVideo(video),
      share_segment_start: segment && segment.start,
      share_segment_end: segment && segment.end,
    };

    this.mixpanelInstance.track(EventTypes.VIDEO_LINK_COPIED, payload);
    this.appcuesInstance.track(EventTypes.VIDEO_LINK_COPIED, payload);
  }

  public trackVideoSharedInGoogle(video: Video, segment: Segment): void {
    const payload = {
      ...toMixpanelVideo(video),
      share_segment_start: segment && segment.start,
      share_segment_end: segment && segment.end,
    };

    this.mixpanelInstance.track(
      EventTypes.VIDEO_SHARED_GOOGLE_CLASSROOM,
      payload,
    );
    this.appcuesInstance.track(
      EventTypes.VIDEO_SHARED_GOOGLE_CLASSROOM,
      payload,
    );
  }

  public trackVideoPlayback(
    video: Video,
    startSeconds: number,
    endSeconds: number,
  ): void {
    const payload = {
      ...toMixpanelVideo(video),
      ...toMixpanelSegment(video, startSeconds, endSeconds),
    };
    this.mixpanelInstance.track(EventTypes.VIDEO_PLAYBACK, payload);
    this.appcuesInstance.track(EventTypes.VIDEO_PLAYBACK, payload);
  }

  public trackFailedAccountCreation(formData: any) {
    this.mixpanelInstance.track(
      EventTypes.REGISTRATION_ATTEMPT_FAILED,
      formData,
    );
  }

  public trackAccountAlreadyExists(formData: any) {
    this.mixpanelInstance.track(
      EventTypes.REGISTRATION_ACCOUNT_EXISTS,
      formData,
    );
  }

  public trackVideoRatingModalOpened() {
    this.mixpanelInstance.track(EventTypes.VIDEO_RATING_MODAL_OPENED);
    this.appcuesInstance.track(EventTypes.VIDEO_RATING_MODAL_OPENED, undefined);
  }

  public trackVideoRating(video: Video, rating: number) {
    this.mixpanelInstance.track(EventTypes.VIDEO_RATING, {
      video_id: video.id,
      video_title: video.title,
      rating,
    });
  }

  public trackVideoTagging(video: Video, tag: Tag) {
    this.mixpanelInstance.track(EventTypes.VIDEO_TAGGING, {
      video_id: video.id,
      video_title: video.title,
      tag: tag.id,
    });
  }

  public trackReferAFriendModalOpened() {
    this.mixpanelInstance.track(EventTypes.REFER_A_FRIEND_MODAL_OPENED);
  }

  public trackReferAFriendModalClosed() {
    this.mixpanelInstance.track(EventTypes.REFER_A_FRIEND_MODAL_CLOSED);
  }

  public trackHomepageExploreCollections() {
    this.mixpanelInstance.track(EventTypes.HOMEPAGE_EXPLORE_COLLECTIONS);
    this.appcuesInstance.track(
      EventTypes.HOMEPAGE_EXPLORE_COLLECTIONS,
      undefined,
    );
  }

  public trackMoreCollectionsLoaded(typeOfCollections: any) {
    const payload = {
      type: typeOfCollections,
    };

    this.mixpanelInstance.track(EventTypes.MORE_COLLECTIONS_LOADED, payload);
    this.appcuesInstance.track(EventTypes.MORE_COLLECTIONS_LOADED, payload);
  }

  public trackSearchFiltersApplied(formData: any) {
    this.mixpanelInstance.track(EventTypes.SEARCH_FILTERS_APPLIED, formData);
    this.appcuesInstance.track(EventTypes.SEARCH_FILTERS_APPLIED, formData);
  }

  public trackSubjectTagClicked(subjectId: string) {
    const payload = {
      subject_id: subjectId,
    };

    this.mixpanelInstance.track(EventTypes.SUBJECT_TAG_CLICKED, payload);
    this.appcuesInstance.track(EventTypes.SUBJECT_TAG_CLICKED, payload);
  }

  public trackMyCollectionsNavbarButtonClicked() {
    this.mixpanelInstance.track(
      EventTypes.MY_COLLECTIONS_NAVBAR_BUTTON_CLICKED,
    );
    this.appcuesInstance.track(
      EventTypes.MY_COLLECTIONS_NAVBAR_BUTTON_CLICKED,
      undefined,
    );
  }

  public trackCollectionsNavbarButtonClicked() {
    this.mixpanelInstance.track(EventTypes.COLLECTIONS_NAVBAR_BUTTON_CLICKED);
    this.appcuesInstance.track(
      EventTypes.COLLECTIONS_NAVBAR_BUTTON_CLICKED,
      undefined,
    );
  }

  public trackOnboardingStarted() {
    this.mixpanelInstance.track(EventTypes.ONBOARDING_STARTED);
    this.appcuesInstance.track(EventTypes.ONBOARDING_STARTED, undefined);
  }

  public trackOnboardingCompleted() {
    this.mixpanelInstance.track(EventTypes.ACTIVATION_COMPLETE);
    this.mixpanelInstance.track(EventTypes.ONBOARDING_COMPLETED);

    this.appcuesInstance.track(EventTypes.ACTIVATION_COMPLETE, undefined);
    this.appcuesInstance.track(EventTypes.ONBOARDING_COMPLETED, undefined);
  }

  public trackOnboardingPageChanged(pageIndex: number) {
    const payload = {
      page_index: pageIndex,
    };

    this.mixpanelInstance.track(EventTypes.ONBOARDING_PAGE_CHANGED, payload);
    this.appcuesInstance.track(EventTypes.ONBOARDING_PAGE_CHANGED, payload);
  }
}
