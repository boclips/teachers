import React, { PureComponent } from 'react';
import { Playback } from '../src/Playback';
import { TrackingTable } from './TrackingTable';

const streamUrl =
  'https://cdnapisec.kaltura.com/p/2394162/sp/239416200/playManifest/entryId/1_e0leuxs1/format/mpegdash/protocol/https/x36xhzz.mp4';

interface State {
  lastEvent: PlaybackEvent | null;
  allEvents: PlaybackEvent[];
}

interface Props {}

export class PlaybackDemo extends PureComponent<Props, State> {
  private trackEvent = (event: PlaybackEvent) => {
    this.setState({
      lastEvent: event,
      allEvents: [...this.state.allEvents, event],
    });
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      lastEvent: null,
      allEvents: [],
    };
  }

  public render() {
    return (
      <div>
        <Playback stream={streamUrl} events={this.trackEvent} autoPlay={true} />

        {this.renderTrackingTable()}
      </div>
    );
  }

  private renderTrackingTable() {
    return (
      <TrackingTable
        lastEvent={this.state.lastEvent}
        allEvents={this.state.allEvents}
      />
    );
  }
}
