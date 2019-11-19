import { Duration } from 'moment';
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
  releasedOn: Date;
  createdBy: string;
  subjects: Subject[];
  playback: StreamPlayback | YoutubePlayback;
  thumbnailUrl: string;
  badges: string[];
  rating: number;
  yourRating?: number;
  links: VideoLinks;
  bestFor?: string;
  promoted?: boolean;
}

export class StreamPlayback {
   public constructor(private streamUrl: string) {}

  public getUrl(): string {
    return this.streamUrl;
  }
}

export class YoutubePlayback {
   public constructor(private youtubeId: string) {}

  public getId(): string {
    return this.youtubeId;
  }
}

export interface Segment {
  start?: number;
  end?: number;
}
