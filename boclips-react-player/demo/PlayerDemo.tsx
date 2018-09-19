import React, { PureComponent } from 'react';
import { BoclipsPlayer } from '../index';
import { TrackingTable } from './TrackingTable';

const thumbnailUrl =
  'https://cfvod.kaltura.com/p/2394162/sp/239416200/thumbnail/entry_id/1_spq0ilkd/version/100021/width/560/height/395';

const streamUrl =
  'https://cdnapisec.kaltura.com/p/2394162/sp/239416200/playManifest/entryId/1_e0leuxs1/format/mpegdash/protocol/https/x36xhzz.mp4';

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
