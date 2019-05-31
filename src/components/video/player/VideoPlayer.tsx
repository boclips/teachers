import { PlayerOptions } from 'boclips-player';
import { Player } from 'boclips-player-react';
import { PlaybackEvent } from 'boclips-player/esm/Events/AnalyticsEvents';
import React from 'react';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { Video } from '../../../types/Video';

interface Props {
  video: Video;
  videoIndex?: number;
  mode?: 'default' | 'thumbnail';
}

export class VideoPlayer extends React.PureComponent<Props> {
  public static defaultProps: Partial<Props> = {
    mode: 'default',
  };

  public render() {
    return (
      <Player
        videoUri={this.props.video.links.self.getOriginalLink()}
        options={this.getPlayerOptions()}
      />
    );
  }

  private handleOnPlayback = (event: PlaybackEvent) => {
    AnalyticsFactory.getInstance().trackVideoPlayback(this.props.video, event);
  };

  private getPlayerOptions(): Partial<PlayerOptions> {
    const options: Partial<PlayerOptions> = {
      analytics: {
        handleOnPlayback: this.handleOnPlayback,
        metadata: {
          videoId: this.props.video.id,
          videoIndex: this.props.videoIndex || null,
        },
      },
    };

    if (this.props.mode === 'thumbnail') {
      options.player = {
        controls: ['play-large'],
      };
    }

    return options;
  }
}

export default VideoPlayer;
