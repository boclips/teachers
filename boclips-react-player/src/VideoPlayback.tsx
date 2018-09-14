import React from 'react';
import shaka from 'shaka-player';

interface PlaybackProps {
  stream: string;
}

export class VideoPlayback extends React.Component<PlaybackProps> {
  private videoRef: React.RefObject<any> = null;

  constructor(props: PlaybackProps) {
    super(props);
    this.videoRef = React.createRef();
  }

  public render() {
    return (
      <video
        className={'boclips-player--playback'}
        data-qa="video-playback"
        ref={this.videoRef}
        width="500"
        controls={true}
        autoPlay={true}
      />
    );
  }

  public componentDidMount() {
    new shaka.Player(this.videoRef.current).load(this.props.stream);
  }
}
