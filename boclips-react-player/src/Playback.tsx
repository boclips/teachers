import React from 'react';
import shaka from 'shaka-player';
import PlaybackStateTracker from './PlaybackStateTracker';

interface Props {
  stream: string;
  autoPlay?: boolean;
  events?: (event: PlaybackEvent) => void;
}

export class Playback extends React.Component<Props> {
  private readonly videoRef: React.RefObject<any> = null;
  private readonly tracker: PlaybackStateTracker = new PlaybackStateTracker(
    this.props.events,
  );

  constructor(props: Props) {
    super(props);
    this.videoRef = React.createRef();
  }

  public render() {
    return (
      <video
        ref={this.videoRef}
        className={'boclips-player--playback'}
        data-qa="video-playback"
        width="500"
        controls={true}
        {...this.tracker.props}
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
}
