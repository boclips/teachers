import { RouterState as ReactRouterState } from 'connected-react-router';
import { VideoFacets } from 'src/types/VideoFacets';
import { AgeRange } from 'src/types/AgeRange';
import { UserProfile } from '../services/users/UserProfile';
import { Country } from './Country';
import { Discipline } from './Discipline';
import { Link } from './Link';
import { Links } from './Links';
import PageSpec from './PageSpec';
import { Subject } from './Subject';
import { Tag } from './Tag';
import { Video, VideoId } from './Video';
import { VideoCollection } from './VideoCollection';

export interface LinksStateValue {
  entries: Links;
  loadingState: 'loading' | 'failure' | 'success';
}

export interface LinksState {
  links: LinksStateValue;
}

export interface VideoSearchStateValue {
  loading: boolean;
  query: string;
  videoIds: string[];
  paging: PageSpec;
  facets?: VideoFacets;
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
  id?: VideoId;
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

export interface VideosState {
  videos: VideosStateValue;
}

export interface SubjectState {
  subjects: Subject[];
}

export interface AgeRangeState {
  ageRanges: AgeRange[];
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
  myCollections: Pageable<string>;
  myResources?: Pageable<string>;
  publicCollections: Pageable<string>;
  discoverCollections: Pageable<string>;
  collectionIdBeingViewed?: string;
}

export interface VideosStateValue {
  promotedVideoIds: string[];
}

export interface EntitiesState {
  entities: EntityStateValue;
}

export interface EntityStateValue {
  collections: { byId: CollectionMap };
  videos: { byId: VideoMap };
}

export interface CollectionMap {
  [key: string]: VideoCollection;
}

export interface VideoMap {
  [videoId: string]: Video;
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
    AgeRangeState,
    CountryState,
    TagState,
    DisciplineState,
    EntitiesState,
    Environment,
    VideosState {
  apiPrefix: string;
}
