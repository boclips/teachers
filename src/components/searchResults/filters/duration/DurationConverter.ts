import dayjs from 'src/types/dayjs';

export default class DurationConverter {
  public secondsToIso = (seconds: number): string => {
    if (seconds === 0) {
      return 'PT0S';
    }

    return dayjs.duration(seconds, 'seconds').toISOString();
  };
}
