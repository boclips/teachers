import React from 'react';

interface Props {
  allEvents: SegmentWatchedEvent[];
  lastEvent: SegmentWatchedEvent;
}

export class TrackingTable extends React.PureComponent<Props> {
  public render() {
    if (this.props.lastEvent != null) {
      return (
        <table>
          <tbody>
            <tr>
              <td>Player identifier</td>
              <td data-qa="player-id">{`${
                this.props.lastEvent.playerId
              }`}</td>
            </tr>
            <tr>
              <td>Capture time</td>
              <td data-qa="capture-time">{`${
                this.props.lastEvent.captureTime
              }`}</td>
            </tr>
            <tr>
              <td>Segment start time</td>
              <td data-qa="segment-start">{`${
                this.props.lastEvent.segmentStartSeconds
              }`}</td>
            </tr>
            <tr>
              <td>Segment end time</td>
              <td data-qa="segment-end">{`${
                this.props.lastEvent.segmentEndSeconds
              }`}</td>
            </tr>
            <tr>
              <td>Event log</td>
              <td data-qa="event-log">
                <p>
                  Number of events fired:{' '}
                  <span data-qa="number-of-events">
                    {this.props.allEvents.length}
                  </span>
                  :
                </p>
                <textarea
                  value={this.props.allEvents
                    .map(event => {
                      return (
                        event.segmentStartSeconds +
                        ' ' +
                        event.segmentEndSeconds +
                        ' ' +
                        event.captureTime
                      );
                    })
                    .join('\n')}
                  cols={50}
                  rows={10}
                />
              </td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return <div data-qa="no-events">Loading event tracking...</div>;
    }
  }
}
