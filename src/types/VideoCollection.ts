import { Link } from './Link';
import { Video, VideoId } from './Video';

export interface VideoCollectionLinks {
  addVideo?: Link;
  removeVideo?: Link;
  edit?: Link;
  remove?: Link;
  self: Link;
}

export interface VideoCollection {
  id: string;
  title: string;
  updatedAt: string;
  videos: VideoMap;
  videoIds: VideoId[];
  links: VideoCollectionLinks;
  isPublic: boolean;
  createdBy: string;
}

// tslint:disable-next-line:interface-over-type-literal
export type VideoMap = { [videoId: string]: Video };
