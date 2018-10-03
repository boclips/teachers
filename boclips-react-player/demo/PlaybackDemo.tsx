import React, { PureComponent } from 'react';
import { Playback } from '../src/Playback';
import { TrackingTable } from './TrackingTable';

const streamUrl =
  'https://cdnapisec.kaltura.com/p/1776261/sp/177626100/playManifest/entryId/0_q1saa1n9/format/mpegdash/protocol/https/x36xhzz.mp4';

interface State {
  lastEvent: SegmentWatchedEvent | null;
  allEvents: SegmentWatchedEvent[];
}

interface Props {}

export class PlaybackDemo extends PureComponent<Props, State> {
  private trackEvent = (event: SegmentWatchedEvent) => {
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
