import moment from 'moment';
import * as React from 'react';

interface Props {
  date: Date | string;
}

export default class DateFormatter extends React.PureComponent<Props> {
  public render() {
    if (!this.props.date) {
      return null;
    }

    const parsedDate = moment(this.props.date);

    if (!parsedDate.isValid()) {
      return null;
    }

    const formattedDate = parsedDate.format('MMM D, YYYY');
    return <span>{formattedDate}</span>;
  }
}
