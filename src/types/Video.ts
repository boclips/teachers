import { Duration } from 'moment';

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: Duration;
  releasedOn: Date;
  contentPartner: string;
  subjects: string[];
  playback: StreamPlayback | YoutubePlayback;
  thumbnailUrl: string;
  badges: string[];
  type: VideoType;
}

export interface VideoType {
  name: string;
}

export class StreamPlayback {
  constructor(private streamUrl: string) {}

  public getUrl(): string {
    return this.streamUrl;
  }
}

export class YoutubePlayback {
  constructor(private youtubeId: string) {}

  public getId(): string {
    return this.youtubeId;
  }
}
