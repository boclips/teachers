import {Links} from './links/Links';
import {Video} from './search-videos/Video';

export interface LinksState {
  links: Links
}

export interface VideosState {
  videos: Video[];
}

export default interface State extends LinksState, VideosState {}