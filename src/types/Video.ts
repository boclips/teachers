import { Duration } from 'moment';
import { AgeRange } from 'src/types/AgeRange';
import { Playback } from 'boclips-api-client/dist/sub-clients/common/model/Playback';
import { Attachment } from 'boclips-api-client/dist/sub-clients/common/model/Attachment';
import { Link } from './Link';
import { Subject } from './Subject';

export interface VideoLinks {
  self: Link;
  transcript?: Link;
  rate?: Link;
  tag?: Link;
  logInteraction?: Link;
}

export interface VideoId {
  value: string;
  links: VideoLinks;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: Duration;
  ageRange: AgeRange;
  releasedOn: Date;
  createdBy: string;
  subjects: Subject[];
  playback: Playback;
  thumbnailUrl: string;
  badges: string[];
  rating: number;
  yourRating?: number;
  links: VideoLinks;
  bestFor?: string;
  promoted?: boolean;
  attachments?: Attachment[];
}

export enum VideoType {
  NEWS = 'NEWS',
  STOCK = 'STOCK',
  INSTRUCTIONAL = 'INSTRUCTIONAL',
}

export interface Segment {
  start?: number;
  end?: number;
}
