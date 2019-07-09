import BoclipsSecurity from 'boclips-js-security';
import { PlayerOptions } from 'boclips-player';
import { Player } from 'boclips-player-react';
import React from 'react';
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

  private getPlayerOptions(): Partial<PlayerOptions> {
    const security = BoclipsSecurity.getInstance();
    const tokenFactory = security.getTokenFactory(5);
    const options: Partial<PlayerOptions> = {
      analytics: {
        metadata: {
          videoId: this.props.video.id,
          videoIndex: this.props.videoIndex || null,
        },
      },
      api: {
        tokenFactory: async () => {
          try {
            return await tokenFactory();
          } catch (error) {
            // The video details page can be viewed anonymously. In that case, return null.
            return null;
          }
        },
      },
    };

    if (
      this.props.mode === 'card' ||
      this.props.mediaBreakpoint.width <= MediaBreakpoints.xs.width
    ) {
      options.interface = {
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
      options.interface = {
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
