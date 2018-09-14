import React from 'react';
import { VideoPlayback } from './VideoPlayback';

interface Props {
  thumbnail?: string;
  stream: string;
}

interface State {
  isPlaying: boolean;
  showPreview: boolean;
}

export class BoclipsPlayer extends React.Component<Props, State> {
  private onThumbnailClick = () => {
    this.setState({ isPlaying: true });
  };

  public constructor(props: Props) {
    super(props);

    this.state = {
      showPreview: props.thumbnail !== undefined,
      isPlaying: false,
    };
  }

  public render() {
    if (this.state.isPlaying || !this.state.showPreview) {
      return this.renderPlayback();
    }

    return this.renderPreview();
  }

  private renderPreview() {
    return (
      <img
        src={this.props.thumbnail}
        onClick={this.onThumbnailClick}
        data-qa="video-thumbnail"
        className={'boclips-player-preview'}
      />
    );
  }

  private renderPlayback() {
    return <VideoPlayback stream={this.props.stream} />;
  }
}
