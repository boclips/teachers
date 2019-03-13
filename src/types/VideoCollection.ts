import { Link } from './Link';
import { Video, VideoId } from './Video';

export interface VideoCollectionLinks {
  addVideo?: Link;
  removeVideo?: Link;
  edit?: Link;
  self: Link;
}

export interface VideoCollection {
  id: string;
  title: string;
  updatedAt: string;
  videos: VideoMap;
  videoIds: VideoId[];
  links: VideoCollectionLinks;
}

// tslint:disable-next-line:interface-over-type-literal
export type VideoMap = { [videoId: string]: Video };
