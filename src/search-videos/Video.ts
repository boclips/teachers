import { Duration } from 'moment';

export interface Video {
  title: string;
  description: string;
  duration: Duration;
  releasedOn: Date;
  contentProvider: string;
}
