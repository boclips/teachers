import moment from 'moment';
import * as React from 'react';

interface Props {
  date: Date;
}

export default class DateFormatter extends React.PureComponent<Props> {
  public render() {
    if (!this.props.date) {
      return null;
    }

    const formattedDate = moment(this.props.date).format('MMM D, YYYY');
    return <span>{formattedDate}</span>;
  }
}
