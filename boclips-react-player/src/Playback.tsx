import React from 'react';
import shaka from 'shaka-player';
import PlaybackStateTracker from './PlaybackStateTracker';
import TrackerConfig from './TrackerConfig';

interface Props {
  stream: string;
  autoPlay?: boolean;
  trackerConfig: TrackerConfig;
}

export class Playback extends React.Component<Props> {
  private readonly videoRef: React.RefObject<any> = null;
  private readonly tracker: PlaybackStateTracker = null;

  constructor(props: Props) {
    super(props);
    this.videoRef = React.createRef();
    this.tracker = new PlaybackStateTracker(props.trackerConfig);
  }

  public render() {
    return (
      <video
        ref={this.videoRef}
        className={'boclips-player--playback'}
        data-qa="video-playback"
        width="500"
        controls={true}
        {...this.tracker.events}
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
