import moment from 'moment';

export default class DurationConverter {
  public secondsToIso(seconds: number): string {
    if (seconds === 0) {
      return 'PT0S';
    }

    return moment.duration(seconds, 'seconds').toISOString();
  }
}
