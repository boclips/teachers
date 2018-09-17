import React from 'react';

interface Props {
  allEvents: PlaybackEvent[];
  lastEvent: PlaybackEvent;
}

export class TrackingTable extends React.PureComponent<Props> {
  public render() {
    if (this.props.lastEvent != null) {
      return (
        <table>
          <tbody>
            <tr>
              <td>Last event</td>
              <td data-qa="last-event">{`${this.props.lastEvent.action}`}</td>
            </tr>
            <tr>
              <td>Current video time</td>
              <td data-qa="video-time">{`${
                this.props.lastEvent.currentTimeSeconds
              }`}</td>
            </tr>
            <tr>
              <td>Current video time</td>
              <td data-qa="video-duration">{`${
                this.props.lastEvent.durationSeconds
              }`}</td>
            </tr>
            <tr>
              <td>Time of event</td>
              <td data-qa="event-time">{`${
                this.props.lastEvent.eventTime
              }`}</td>
            </tr>
            <tr>
              <td>Is playing?</td>
              <td data-qa="is-playing">{`${
                this.props.lastEvent.isPlaying
              }`}</td>
            </tr>
            <tr>
              <td>Is paused?</td>
              <td data-qa="is-paused">{`${this.props.lastEvent.isPaused}`}</td>
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
                        event.action +
                        ' ' +
                        event.currentTimeSeconds +
                        ' ' +
                        event.eventTime
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
