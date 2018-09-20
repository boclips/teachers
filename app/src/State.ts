import { RouterState as ReactRouterState } from 'connected-react-router';
import { Links } from './links/Links';
import { UserCredentials } from './login/UserCredentials';
import { Video } from './videos/Video';

export interface UserState {
  user: UserCredentials;
}

export interface LinksState {
  links: Links;
}

export interface VideosStateValue {
  loading: boolean;
  query: {
    phrase: string;
  };
  items: Video[];
}

export interface VideoStateValue {
  loading: boolean;
  item: Video;
}

export interface VideosState {
  videos: VideosStateValue;
}

export interface VideoDetailsState {
  video: VideoStateValue;
}

export interface RouterState {
  router: ReactRouterState;
}

export default interface State
  extends LinksState,
    VideosState,
    UserState,
    VideoDetailsState {}
