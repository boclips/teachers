import { Link } from './Link';
import { Video } from './Video';

export interface VideoCollectionLinks {
  addVideo: Link;
  removeVideo: Link;
  self: Link;
}

export interface VideoCollection {
  id: string;
  title: string;
  updatedAt: string;
  videos: Video[];
  links: VideoCollectionLinks;
}
