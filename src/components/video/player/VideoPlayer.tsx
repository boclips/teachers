import { PlayerOptions } from 'boclips-player';
import { Player } from 'boclips-player-react';
import { PlaybackEvent } from 'boclips-player/esm/Events/AnalyticsEvents';
import React from 'react';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import MediaBreakpoints from '../../../types/MediaBreakpoints';
import { Video } from '../../../types/Video';
import withMediaBreakPoint, {
  WithMediaBreakPointProps,
} from '../../common/higerOrderComponents/withMediaBreakPoint';

interface Props extends WithMediaBreakPointProps {
  video: Video;
  videoIndex?: number;
  mode?: 'default' | 'card';
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

    if (
      this.props.mode === 'card' ||
      this.props.mediaBreakpoint.width <= MediaBreakpoints.xs.width
    ) {
      options.player = {
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'captions',
        ],
      };
    } else {
      options.player = {
        controls: [
          'rewind',
          'play',
          'fast-forward',
          'progress',
          'current-time',
          'mute',
          'volume',
          'captions',
          'settings',
          'fullscreen',
        ],
      };
    }

    return options;
  }
}

export default withMediaBreakPoint(VideoPlayer);
