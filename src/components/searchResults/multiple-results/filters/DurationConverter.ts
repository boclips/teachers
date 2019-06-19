import moment from 'moment';

export default class DurationConverter {
  public secondsToIso(seconds: number): string {
    return seconds == null
      ? null
      : moment.duration(seconds, 'seconds').toISOString();
  }
}
