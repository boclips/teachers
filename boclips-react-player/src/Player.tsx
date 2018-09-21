import React from 'react';
import { Playback } from './Playback';
import './styles/BoclipsPlayer.less';
import TrackerConfig from './TrackerConfig';

interface Props {
  thumbnail?: string;
  stream: string;
  trackerConfig?: TrackerConfig;
}

interface State {
  isPlaying: boolean;
  showPreview: boolean;
}

export class Player extends React.Component<Props, State> {
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
    let playerContent;
    if (this.state.isPlaying || !this.state.showPreview) {
      playerContent = this.renderPlayback();
    } else {
      playerContent = this.renderPreview();
    }
    return <section className="boclips-player">{playerContent}</section>;
  }

  private renderPreview() {
    return (
      <img
        src={this.props.thumbnail}
        onClick={this.onThumbnailClick}
        data-qa="video-thumbnail"
        className={'boclips-player--preview'}
      />
    );
  }

  private renderPlayback() {
    return (
      <Playback
        stream={this.props.stream}
        trackerConfig={this.props.trackerConfig}
        autoPlay={this.state.isPlaying}
      />
    );
  }
}
