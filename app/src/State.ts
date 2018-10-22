import { RouterState as ReactRouterState } from 'connected-react-router';
import { KeycloakInstance } from 'keycloak-js';
import { Links } from './links/Links';
import { Video } from './videos/Video';

export interface LinksState {
  links: Links;
}

export interface SearchResults {
  searchId: string;
  query: string;
  videos: Video[];
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
  login: KeycloakInstance;
}

export default interface State
  extends LinksState,
    SearchState,
    LoginState,
    VideoDetailsState {}
