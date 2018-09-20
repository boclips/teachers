import { Duration } from 'moment';
import 'moment-duration-format';
import React from 'react';

interface Props {
  duration: Duration;
}

export default class DurationFormatter extends React.PureComponent<Props> {
  public render() {
    if (!this.props.duration) {
      return null;
    }

    const formattedDuration = this.props.duration.format('h[h] m[m] s[s]');
    return <span>{formattedDuration}</span>;
  }
}
