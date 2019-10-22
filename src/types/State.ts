import { RouterState as ReactRouterState } from 'connected-react-router';
import { UserProfile } from '../services/users/UserProfile';
import { Country } from './Country';
import { Discipline } from './Discipline';
import { Link } from './Link';
import { Links } from './Links';
import PageSpec from './PageSpec';
import { Subject } from './Subject';
import { Tag } from './Tag';
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

export interface CollectionsSearchResult {
  query: string;
  collections: VideoCollection[];
}

export interface VideoSearchStateValue extends VideoSearchResults {
  loading: boolean;
}

export interface CollectionSearchStateValue {
  loading: boolean;
  query: string;
  collectionIds: string[];
}

export interface AuthenticationStateValue {
  status: 'authenticated' | 'anonymous';
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

export interface UserState {
  user?: UserProfile;
}

export interface AuthenticationState {
  authentication?: AuthenticationStateValue;
}

export interface CollectionState {
  collections: CollectionsStateValue;
}

export interface SubjectState {
  subjects: Subject[];
}

export interface CountryState {
  countries: Country[];
}

export interface TagState {
  tags: Tag[];
}

export interface DisciplineState {
  disciplines: Discipline[];
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
  myCollections: Pageable<string>; // TODO rename to ids
  publicCollections: Pageable<string>;
  discoverCollections: Pageable<string>;
  bookmarkedCollections: Pageable<string>;
  collectionIdBeingViewed?: string;
}

export interface EntitiesState {
  entities: EntityStateValue;
}

export interface EntityStateValue {
  collections: { byId: { [key: string]: VideoCollection } };
}

export function getIndexOfCollection(
  collections: string[],
  collectionId: string,
) {
  return collections.findIndex(id => id === collectionId);
}

export function isMyCollection(myCollections: string[], collectionId: string) {
  const indexOfCollection = getIndexOfCollection(myCollections, collectionId);
  return indexOfCollection >= 0;
}

export default interface State
  extends AuthenticationState,
    LinksState,
    SearchState,
    UserState,
    VideoDetailsState,
    RouterState,
    CollectionState,
    SubjectState,
    CountryState,
    TagState,
    DisciplineState,
    EntitiesState,
    Environment {
  apiPrefix: string;
}
