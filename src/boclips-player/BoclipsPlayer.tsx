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
    return <video data-qa="video-playback" ref={this.videoRef} />;
  }

  public componentDidMount() {
    new shaka.Player(this.videoRef.current).load(this.props.stream);
  }
}

interface Props {
  thumbnail: string;
  stream: string;
}
interface State {
  isPlaying: boolean;
}
export default class BoclipsPlayer extends React.Component<Props, State> {
  private onThumbnailClick = () => {
    this.setState({ isPlaying: true });
  };
  public constructor(props: Props) {
    super(props);
    this.state = { isPlaying: false };
  }
  public render() {
    if (this.state.isPlaying) {
      return <VideoPlayback stream={this.props.stream} />;
    }
    return (
      <img
        src={this.props.thumbnail}
        onClick={this.onThumbnailClick}
        data-qa="video-thumbnail"
      />
    );
  }
}
