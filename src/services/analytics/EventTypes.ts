enum EventTypes {
  ACTIVATION_COMPLETE = 'ACTIVATION_COMPLETE',
  VIDEO_SEARCH = 'VIDEO_SEARCH',
  VIDEO_VISITED = 'VIDEO_VISITED',
  VIDEO_LINK_COPIED = 'VIDEO_LINK_COPIED',
  VIDEO_ADDED_TO_COLLECTION = 'COLLECTION_VIDEO_ADDED',
  VIDEO_REMOVED_FROM_COLLECTION = 'COLLECTION_VIDEO_REMOVED',
  DEFAULT_COLLECTION_VISITED = 'COLLECTION_VISITED',
  COLLECTION_CREATED = 'COLLECTION_CREATED',
  COLLECTION_RENAMED = 'COLLECTION_RENAMED',
  COLLECTION_REMOVED = 'COLLECTION_REMOVED',
  MY_COLLECTIONS_VISITED = 'MY_COLLECTIONS_VISITED',
  VIDEO_PLAYBACK = 'VIDEO_PLAYBACK',
  VIDEO_RATING = 'VIDEO_RATING',
  VISIBILITY_CHANGED = 'VISIBILITY_CHANGED',
  REGISTRATION_INITIATED = 'REGISTRATION_INITIATED',
  COLLECTION_SEARCH = 'COLLECTION_SEARCH',
  COLLECTION_BOOKMARKED = 'COLLECTION_BOOKMARKED',
  COLLECTION_UNBOOKMARKED = 'COLLECTION_UNBOOKMARKED',
  REGISTRATION_ATTEMPT_FAILED = 'REGISTRATION_ATTEMPT_FAILED',
  REGISTRATION_ACCOUNT_EXISTS = 'REGISTRATION_ACCOUNT_EXISTS',
  REFER_A_FRIEND_MODAL_CLOSED = 'REFER_A_FRIEND_MODAL_CLOSED',
  REFER_A_FRIEND_MODAL_OPENED = 'REFER_A_FRIEND_MODAL_OPENED',
  VIDEO_RATING_MODAL_OPENED = 'VIDEO_RATING_MODAL_OPENED',
  HOMEPAGE_EXPLORE_COLLECTIONS = 'HOMEPAGE_EXPLORE_COLLECTIONS',
  MORE_COLLECTIONS_LOADED = 'MORE_PUBLIC_COLLECTION_LOADED',
  DISCOVER_COLLECTIONS = 'DISCOVER_COLLECTIONS',
  SEARCH_FILTERS_APPLIED = 'SEARCH_FILTERS_APPLIED',
  SUBJECT_TAG_CLICKED = 'SUBJECT_TAG_CLICKED',
  MY_COLLECTIONS_NAVBAR_BUTTON_CLICKED = 'MY_COLLECTIONS_NAVBAR_BUTTON_CLICKED',
  COLLECTIONS_NAVBAR_BUTTON_CLICKED = 'COLLECTIONS_NAVBAR_BUTTON_CLICKED',
}

export default EventTypes;
