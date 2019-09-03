import { EditCollectionRequest } from '../../components/collection/redux/actions/editCollectionAction';
import { Attachment } from '../../types/Attachment';
import { CollectionSearchResults, VideoSearchResults } from '../../types/State';
import { Tag } from '../../types/Tag';
import { Segment, Video } from '../../types/Video';
import { VideoCollection } from '../../types/VideoCollection';
import { VideoSearchRequest } from '../../types/VideoSearchRequest';
import { CreateCollectionRequest } from '../collections/createCollection';
import { UserProfile } from '../users/UserProfile';
import EventTypes from './EventTypes';
import { toMixpanelSegment } from './toMixpanelSegment';
import { toMixpanelVideo } from './toMixpanelVideo';

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

    this.mixpanelInstance.track(EventTypes.VIDEO_SEARCH, {
      [`${EventTypes.VIDEO_SEARCH}_query`.toLowerCase()]: searchResults.query,
      [`${EventTypes.VIDEO_SEARCH}_number_of_results`.toLowerCase()]:
        searchResults.videos && searchResults.videos.length,
      [`${EventTypes.VIDEO_SEARCH}_page_number`.toLowerCase()]: searchResults
        .paging.number,
      [`${EventTypes.VIDEO_SEARCH}_type`.toLowerCase()]: type,
    });
  }

  public trackCollectionSearch(searchResults: CollectionSearchResults) {
    this.mixpanelInstance.track(EventTypes.COLLECTION_SEARCH, {
      [`${
        EventTypes.COLLECTION_SEARCH
      }_query`.toLowerCase()]: searchResults.query,
      [`${EventTypes.COLLECTION_SEARCH}_number_of_results`.toLowerCase()]:
        searchResults.collections && searchResults.collections.length,
    });
  }

  public trackDiscoveryPage(subjectId?: string[], disciplineId?: string) {
    this.mixpanelInstance.track(EventTypes.DISCOVER_COLLECTIONS, {
      subject_id: subjectId ? subjectId : null,
      discipline_id: disciplineId ? disciplineId : null,
    });
  }

  public trackCollectionVisited(collection: VideoCollection): void {
    this.mixpanelInstance.track(EventTypes.DEFAULT_COLLECTION_VISITED, {
      video_collection_title: collection.title,
      video_collection_id: collection.id,
      video_collection_is_owner: collection.isMine,
      video_collection_is_public: collection.isPublic,
    });
  }

  public trackMyCollectionsVisited(): void {
    this.mixpanelInstance.track(EventTypes.MY_COLLECTIONS_VISITED);
  }

  public trackCollectionAttachmentLinkVisited(
    collectionId: VideoCollection['id'],
    attachment: Attachment,
  ): void {
    this.mixpanelInstance.track(EventTypes.COLLECTION_ATTACHMENT_VISITED, {
      video_collection_id: collectionId,
      attachment_id: attachment.id,
      attachment_type: attachment.type,
    });
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

  public trackCollectionBookmarked(collection: VideoCollection): void {
    this.mixpanelInstance.track(EventTypes.COLLECTION_BOOKMARKED, {
      collection_title: collection.title,
      collection_id: collection.id,
    });
  }

  public trackCollectionUnbookmarked(collection: VideoCollection): void {
    this.mixpanelInstance.track(EventTypes.COLLECTION_UNBOOKMARKED, {
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

  public trackVideoLinkCopied(video: Video, segment: Segment): void {
    this.mixpanelInstance.track(EventTypes.VIDEO_LINK_COPIED, {
      ...toMixpanelVideo(video),
      share_segment_start: segment && segment.start,
      share_segment_end: segment && segment.end,
    });
  }

  public trackVideoPlayback(
    video: Video,
    startSeconds: number,
    endSeconds: number,
  ): void {
    this.mixpanelInstance.track(EventTypes.VIDEO_PLAYBACK, {
      ...toMixpanelVideo(video),
      ...toMixpanelSegment(video, startSeconds, endSeconds),
    });
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
  }

  public trackMoreCollectionsLoaded(typeOfCollections: any) {
    this.mixpanelInstance.track(EventTypes.MORE_COLLECTIONS_LOADED, {
      type: typeOfCollections,
    });
  }

  public trackSearchFiltersApplied(formData: any) {
    this.mixpanelInstance.track(EventTypes.SEARCH_FILTERS_APPLIED, formData);
  }

  public trackSubjectTagClicked(subjectId: string) {
    this.mixpanelInstance.track(EventTypes.SUBJECT_TAG_CLICKED, {
      subject_id: subjectId,
    });
  }

  public trackMyCollectionsNavbarButtonClicked() {
    this.mixpanelInstance.track(
      EventTypes.MY_COLLECTIONS_NAVBAR_BUTTON_CLICKED,
    );
  }

  public trackCollectionsNavbarButtonClicked() {
    this.mixpanelInstance.track(EventTypes.COLLECTIONS_NAVBAR_BUTTON_CLICKED);
  }

  public trackOnboardingStarted() {
    this.mixpanelInstance.track(EventTypes.ONBOARDING_STARTED);
  }

  public trackOnboardingCompleted() {
    this.mixpanelInstance.track(EventTypes.ACTIVATION_COMPLETE);
    this.mixpanelInstance.track(EventTypes.ONBOARDING_COMPLETED);
  }

  public trackOnboardingPageChanged(pageIndex: number) {
    this.mixpanelInstance.track(EventTypes.ONBOARDING_PAGE_CHANGED, {
      page_index: pageIndex,
    });
  }
}
