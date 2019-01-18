import { Link } from './Link';
import { Video } from './Video';

export interface VideoCollectionLinks {
  addVideo: Link;
}

export interface VideoCollection {
  videos: Video[];
  links: VideoCollectionLinks;
}
