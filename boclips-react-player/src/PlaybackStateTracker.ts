import axios from 'axios';
import { ReactEventHandler, SyntheticEvent } from 'react';
import TrackerConfig from './TrackerConfig';
import { uuid } from './uuid';

interface VideoElementProps {
  onPlay: ReactEventHandler<HTMLVideoElement>;
  onPause: ReactEventHandler<HTMLVideoElement>;
}

export default class PlaybackStateTracker {
  private segmentPlaybackStartTime: number;
  private playerId: string;

  constructor(private config: TrackerConfig) {
    this.segmentPlaybackStartTime = -1;
      this.playerId = uuid();
  }

  get events(): VideoElementProps {
    return {
      onPlay: (e: SyntheticEvent<HTMLVideoElement>) => {
        this.segmentPlaybackStartTime = e.currentTarget.currentTime;
      },
      onPause: (e: SyntheticEvent<HTMLVideoElement>) => {
        const playbackEvent = {
          ...this.config.eventExtraData,
          captureTime: new Date(),
          playerId: this.playerId,
          segmentStartSeconds: this.segmentPlaybackStartTime,
          segmentEndSeconds: e.currentTarget.currentTime,
          videoDurationSeconds: e.currentTarget.duration,
        };
        if (this.config.onSegmentWatched) {
          this.config.onSegmentWatched(playbackEvent);
        }

        if (this.config.trackingEndpoint) {
          axios.post(this.config.trackingEndpoint, playbackEvent);
        }
      },
    };
  }
}
