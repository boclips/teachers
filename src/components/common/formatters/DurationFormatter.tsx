import { Duration } from 'dayjs/plugin/duration';
import React from 'react';

interface Props {
  duration: Duration;
}

const DurationFormatter = ({ duration }: Props) => {
  const durationFormatter = (d: string) =>
    d.replace('PT', '').replace('H', 'h ').replace('M', 'm ').replace('S', 's');

  const formattedDuration = duration
    ? durationFormatter(duration.toISOString())
    : null;

  return <span>{formattedDuration}</span>;
};

export default DurationFormatter;
