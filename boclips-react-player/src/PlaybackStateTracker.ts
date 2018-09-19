import { ReactEventHandler, SyntheticEvent } from 'react';
import { uuid } from './uuid';

interface VideoElementProps {
  onPlay: ReactEventHandler<HTMLVideoElement>;
  onPause: ReactEventHandler<HTMLVideoElement>;
}

export default class PlaybackStateTracker {
  private segmentPlaybackStartTime: number;

  constructor(private onEventHandler: (event: PlaybackEvent) => void) {
    this.segmentPlaybackStartTime = -1;
  }

  get props(): VideoElementProps {
    return {
      onPlay: (e: SyntheticEvent<HTMLVideoElement>) => {
        this.segmentPlaybackStartTime = e.currentTarget.currentTime;
      },
      onPause: (e: SyntheticEvent<HTMLVideoElement>) => {
        this.onEventHandler({
          captureTime: new Date(),
          playerIdentifier: uuid(),
          segmentStartSeconds: this.segmentPlaybackStartTime,
          segmentEndSeconds: e.currentTarget.currentTime,
          videoDurationSeconds: e.currentTarget.duration,
        });
      },
    };
  }
}
