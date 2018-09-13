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
        data-qa="video-playback"
        ref={this.videoRef}
        width="640"
        controls={true}
        autoplay={true}
      />
    );
  }

  public componentDidMount() {
    new shaka.Player(this.videoRef.current).load(this.props.stream);
  }
}
