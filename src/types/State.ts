import { RouterState as ReactRouterState } from 'connected-react-router';
import { Links } from './Links';
import PageSpec from './PageSpec';
import { Video } from './Video';
import { VideoCollection } from './VideoCollection';

export interface LinksState {
  links: Links;
}

export interface SearchResults {
  searchId: string;
  query: string;
  videos: Video[];
  paging: PageSpec;
}

export interface SearchStateValue extends SearchResults {
  loading: boolean;
}

export interface VideoStateValue {
  loading: boolean;
  item: Video;
}

export interface SearchState {
  search: SearchStateValue;
}

export interface VideoDetailsState {
  video: VideoStateValue;
}

export interface RouterState {
  router: ReactRouterState;
}

export interface LoginState {
  login: boolean;
}

export interface CollectionState {
  videoCollection: VideoCollection;
}

export default interface State
  extends LinksState,
    SearchState,
    LoginState,
    VideoDetailsState,
    RouterState,
    CollectionState {}
