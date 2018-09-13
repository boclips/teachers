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

export interface VideosState {
  videos: VideosStateValue;
}

export default interface State extends LinksState, VideosState, UserState {}
