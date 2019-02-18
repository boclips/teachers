import { Link } from './Link';
import { Video } from './Video';

export interface VideoCollectionLinks {
  addVideo: Link;
  removeVideo: Link;
}

export interface VideoCollection {
  id: string;
  title: string;
  videos: Video[];
  links: VideoCollectionLinks;
}
