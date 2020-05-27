import { AgeRange } from './AgeRange';
import { Attachment } from './Attachment';
import { Link } from './Link';
import { VideoId } from './Video';

export interface VideoCollectionLinks {
  addVideo?: Link;
  removeVideo?: Link;
  edit?: Link;
  remove?: Link;
  bookmark?: Link;
  unbookmark?: Link;
  self: Link;
  interactedWith?: Link;
}

export interface VideoCollection {
  id: string;
  title: string;
  updatedAt: string;
  videoIds: VideoId[];
  links: VideoCollectionLinks;
  discoverable: boolean;
  subjects: string[];
  isMine: boolean;
  createdBy: string;
  ageRange?: AgeRange;
  description?: string;
  subCollections: VideoCollection[];
  attachments: Attachment[];
}
