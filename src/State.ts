import { Links } from './links/Links';
import { Video } from './search-videos/Video';

export interface LinksState {
  links: Links;
}

export interface VideosStateValue {
  loading: boolean;
  items: Video[];
}

export interface VideosState {
  videos: VideosStateValue;
}

export default interface State extends LinksState, VideosState {}
