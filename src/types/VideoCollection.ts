import { Link } from './Link';
import { Video } from './Video';

export interface VideoCollectionLinks {
  addVideo: Link;
  removeVideo: Link;
}

export interface VideoCollection {
  videos: Video[];
  links: VideoCollectionLinks;
}
