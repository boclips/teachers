import { Duration } from 'moment';

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: Duration;
  releasedOn: Date;
  contentProvider: string;
  thumbnailUrl: string;
  streamUrl: string;
}
