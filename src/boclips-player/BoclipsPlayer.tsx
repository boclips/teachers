import React from 'react';
import { VideoPlayback } from './VideoPlayback';

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
