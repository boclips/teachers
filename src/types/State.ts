import { RouterState as ReactRouterState } from 'connected-react-router';
import { UserProfile } from '../services/users/UserProfile';
import { AgeRange } from './AgeRange';
import { Link } from './Link';
import { Links } from './Links';
import PageSpec from './PageSpec';
import { Subject } from './Subject';
import { Video } from './Video';
import { VideoCollection } from './VideoCollection';

export interface LinksState {
  links: Links;
}

export interface VideoSearchResults {
  query: string;
  videos: Video[];
  paging: PageSpec;
}

export interface CollectionSearchResults {
  query: string;
  collections: VideoCollection[];
}

export interface VideoSearchStateValue extends VideoSearchResults {
  loading: boolean;
}

export interface CollectionSearchStateValue extends CollectionSearchResults {
  loading: boolean;
}

export interface VideoStateValue {
  loading: boolean;
  item: Video;
}

export interface SearchState {
  search: SearchStateValue;
}

export interface SearchStateValue {
  videoSearch: VideoSearchStateValue;
  collectionSearch: CollectionSearchStateValue;
}

export interface VideoDetailsState {
  video: VideoStateValue;
}

export interface RouterState {
  router: ReactRouterState;
}

export interface LoginState {
  user?: UserProfile;
}

export interface CollectionState {
  collections: CollectionsStateValue;
}

export interface SubjectState {
  subjects: Subject[];
}

export interface AgeRangeState {
  ageRanges: AgeRange[];
}

export interface Environment {
  apiPrefix: string;
}

export interface Pageable<T> {
  items: T[];
  links: {
    next?: Link;
  };
}

export interface CollectionsStateValue {
  loading: boolean;
  updating: boolean;
  myCollections: Pageable<VideoCollection>;
  publicCollections: Pageable<VideoCollection>;
  discoverCollections: Pageable<VideoCollection>;
  bookmarkedCollections: Pageable<VideoCollection>;
  collectionBeingViewed?: VideoCollection;
}

export function getIndexOfCollection(
  collections: VideoCollection[],
  collectionId: string,
) {
  const indexOfCollection = collections.findIndex(
    col => col.id === collectionId,
  );
  return indexOfCollection;
}

export default interface State
  extends LinksState,
    SearchState,
    LoginState,
    VideoDetailsState,
    RouterState,
    CollectionState,
    SubjectState,
    AgeRangeState,
    Environment {}
