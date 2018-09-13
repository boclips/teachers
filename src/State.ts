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
  query: string;
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

export default interface State
  extends LinksState,
    VideosState,
    UserState,
    VideoDetailsState {}
