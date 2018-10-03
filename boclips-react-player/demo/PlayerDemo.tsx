import React, { PureComponent } from 'react';
import { BoclipsPlayer } from '../index';
import { TrackingTable } from './TrackingTable';

const thumbnailUrl =
  'https://cfvod.kaltura.com/p/1776261/sp/177626100/thumbnail/entry_id/0_q1saa1n9/version/100002/vid_sec/36/quality/75/width/600/height/450';

const streamUrl =
  'https://cdnapisec.kaltura.com/p/1776261/sp/177626100/playManifest/entryId/0_q1saa1n9/format/mpegdash/protocol/https/x36xhzz.mp4';

interface State {
  lastEvent: SegmentWatchedEvent | null;
  allEvents: SegmentWatchedEvent[];
}

interface Props {}

export class PlayerDemo extends PureComponent<Props, State> {
  private eventHandler = (event: SegmentWatchedEvent) => {
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
        <BoclipsPlayer
          thumbnail={thumbnailUrl}
          stream={streamUrl}
          trackerConfig={{ onSegmentWatched: this.eventHandler }}
        />
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
