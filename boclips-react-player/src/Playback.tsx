import React from 'react';
import shaka from 'shaka-player';
import { uuid } from './uuid';

interface Props {
  stream: string;
  autoPlay?: boolean;
  events?: (event: PlaybackEvent) => void;
}

export class Playback extends React.Component<Props> {
  private readonly videoRef: React.RefObject<any> = null;
  private readonly playerIdentifier: string;

  private onPlay = () => {
    this.trackEvent('play');
  };
  private onPause = () => {
    this.trackEvent('pause');
  };
  private onEnded = () => {
    this.trackEvent('ended');
  };

  constructor(props: Props) {
    super(props);
    this.videoRef = React.createRef();
    this.playerIdentifier = uuid();
  }

  public render() {
    return (
      <video
        ref={this.videoRef}
        className={'boclips-player--playback'}
        data-qa="video-playback"
        width="500"
        controls={true}
        onPlay={this.onPlay}
        onPause={this.onPause}
        onEnded={this.onEnded}
      />
    );
  }

  public componentDidMount() {
    new shaka.Player(this.videoRef.current).load(this.props.stream).then(() => {
      if (this.props.autoPlay) {
        this.videoRef.current.play();
      }
    });
  }

  private trackEvent(action: string) {
    if (this.props.events) {
      const eventData = {
        action,
        isPaused: this.videoRef.current.paused,
        isPlaying: !this.videoRef.current.paused,
        currentTimeSeconds: Math.ceil(this.videoRef.current.currentTime),
        durationSeconds: Math.ceil(this.videoRef.current.duration),
        eventTime: new Date(),
        playerIdentifier: this.playerIdentifier,
      } as PlaybackEvent;

      this.props.events(eventData);
    }
  }
}
