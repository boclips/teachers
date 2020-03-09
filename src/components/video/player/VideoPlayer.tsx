import BoclipsSecurity from 'boclips-js-security';
import { Player, PlayerOptions } from 'boclips-player';
import { Player as PlayerComponent } from 'boclips-player-react';
import LazyLoad from 'react-lazy-load';
import querystring from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import MediaBreakpoints from '../../../types/MediaBreakpoints';
import State from '../../../types/State';
import { Segment, Video } from '../../../types/Video';
import {
  withMediaBreakPoint,
  WithMediaBreakPointProps,
} from '../../common/higherOrderComponents/withMediaBreakPoint';

export interface OwnProps extends WithMediaBreakPointProps {
  video: Video;
  videoIndex?: number;
  mode?: 'default' | 'card';
}

interface StateProps {
  segment?: Segment;
}

class VideoPlayer extends React.PureComponent<OwnProps & StateProps> {
  public static defaultProps: Partial<OwnProps> = {
    mode: 'default',
  };

  private player: Player;

  public render() {
    return (
      <div className="video-player">
        <LazyLoad
          key={this.props.video.id}
          offsetVertical={200}
          onContentVisible={this.loadVideo}
        >
          <PlayerComponent
            playerRef={this.getPlayerRef}
            options={this.getPlayerOptions()}
          />
        </LazyLoad>
      </div>
    );
  }

  private getPlayerRef = player => {
    this.player = player;
  };

  private loadVideo = () => {
    if (this.props.segment.start || this.props.segment.end) {
      this.player.loadVideo(
        this.props.video.links.self.getOriginalLink(),
        this.props.segment,
      );
    } else {
      this.player.loadVideo(this.props.video.links.self.getOriginalLink());
    }
  };

  private handleOnPlayback = (_, startSeconds: number, endSeconds: number) => {
    AnalyticsFactory.externalAnalytics().trackVideoPlayback(
      this.props.video,
      startSeconds,
      endSeconds,
    );
  };

  private getPlayerOptions(): Partial<PlayerOptions> {
    const security = BoclipsSecurity.getInstance();
    const tokenFactory = security.getTokenFactory(5);
    const options: Partial<PlayerOptions> = {
      analytics: {
        metadata: {
          videoId: this.props.video.id,
          videoIndex: this.props.videoIndex,
        },
        handleOnSegmentPlayback: this.handleOnPlayback,
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
      debug: false,
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
          'fullscreen',
        ],
        addons: {
          hoverPreview: true,
        },
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

const mapStateToProps = (state: State): StateProps => {
  const params = querystring.parse(state.router.location.search);

  const segment: Segment = {};

  if (typeof params.segmentStart === 'string') {
    segment.start = parseInt(params.segmentStart, 10);
  }
  if (typeof params.segmentEnd === 'string') {
    segment.end = parseInt(params.segmentEnd, 10);
  }

  return {
    segment,
  };
};
export default connect(mapStateToProps)(withMediaBreakPoint(VideoPlayer));
