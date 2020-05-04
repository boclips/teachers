import BoclipsSecurity from 'boclips-js-security';
import { Player, PlayerOptions } from 'boclips-player';
import { Player as PlayerComponent } from 'boclips-player-react';
import LazyLoad from 'react-lazy-load';
import querystring from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { ShareModal } from 'src/components/common/share/ShareModal';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import MediaBreakpoints from '../../../types/MediaBreakpoints';
import State from '../../../types/State';
import { Segment, Video } from '../../../types/Video';
import {
  withMediaBreakPoint,
  WithMediaBreakPointProps,
} from '../../common/higherOrderComponents/withMediaBreakPoint';
import Share from '../../../../resources/images/share_white.svg';
import { VideoShareButtonForm } from '../sharing/VideoShareButton/VideoShareButton';

const share = ReactDOMServer.renderToStaticMarkup(<Share />);

export interface OwnProps extends WithMediaBreakPointProps {
  video: Video;
  videoIndex?: number;
  mode?: 'default' | 'card';
}

interface StateProps {
  segment?: Segment;
  shareCode?: string;
  isAuthenticated: boolean;
}

class VideoPlayer extends React.PureComponent<
  OwnProps & StateProps,
  {
    hasError: boolean;
    modalVisible: boolean;
  }
> {
  public state = {
    hasError: false,
    modalVisible: false,
  };

  public static defaultProps: Partial<OwnProps> = {
    mode: 'default',
  };

  private player: Player;

  public render() {
    if (this.state.hasError) {
      return null;
    }

    return (
      <div className="video-player">
        <LazyLoad key={this.props.video.id} offsetVertical={200}>
          <div>
            <PlayerComponent
              playerRef={this.setPlayerRef}
              options={this.getPlayerOptions()}
              videoUri={this.props.video.links.self.getOriginalLink()}
            />
            <ShareModal
              visible={this.state.modalVisible}
              onCancel={() => {
                this.setState({ modalVisible: false });
              }}
              title={'Share Video'}
              shareCode={this.props.shareCode}
            >
              <VideoShareButtonForm video={this.props.video} />
            </ShareModal>
          </div>
        </LazyLoad>
      </div>
    );
  }

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  private setPlayerRef = (player) => {
    this.player = player;

    this.loadSegment();
  };

  public componentDidUpdate(prevProps: Readonly<OwnProps & StateProps>) {
    const prevVideoUri = prevProps.video.links.self.getOriginalLink();
    const currentVideoUri = this.props.video.links.self.getOriginalLink();

    if (this.player && prevVideoUri !== currentVideoUri) {
      this.player.loadVideo(currentVideoUri);
    }
  }

  private loadSegment = () => {
    if (!this.player) {
      return;
    }

    if (this.props.segment.start || this.props.segment.end) {
      this.player.loadVideo(
        this.props.video.links.self.getOriginalLink(),
        this.props.segment,
      );
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
          rewatchButton: true,
        },
        ratio: '16:9',
      };
    } else {
      options.interface = {
        controls: [
          'rewind',
          'play',
          'play-large',
          'fast-forward',
          'progress',
          'current-time',
          'mute',
          'volume',
          'captions',
          'settings',
          'fullscreen',
        ],
        addons: {
          rewatchButton: true,
          generalButtons: this.generateGeneralButtons(),
        },
        ratio: '16:9',
      };
    }

    return options;
  }

  private generateGeneralButtons = () =>
    this.props.isAuthenticated && [
      {
        child: share,
        onClick: () => {
          this.setState({ modalVisible: true });
        },
      },
    ];
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
    shareCode: state.user?.shareCode,
    isAuthenticated: !!state.user,
  };
};
export default connect(mapStateToProps)(withMediaBreakPoint(VideoPlayer));
