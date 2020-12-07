import BoclipsSecurity from 'boclips-js-security';
import { Player, PlayerOptions } from 'boclips-player';
import { Player as PlayerComponent } from 'boclips-player-react';
import LazyLoad from 'react-lazy-load';
import querystring from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { CollectionKey } from 'src/types/CollectionKey';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import MediaBreakpoints from '../../../types/MediaBreakpoints';
import State from '../../../types/State';
import { Segment, Video } from '../../../types/Video';
import {
  withMediaBreakPoint,
  WithMediaBreakPointProps,
} from '../../common/higherOrderComponents/withMediaBreakPoint';
import { EndOfVideoOverlay } from './EndVideoOverlay';
import './EndVideoOverlay.less';

export interface OwnProps extends WithMediaBreakPointProps {
  video: Video;
  videoIndex?: number;
  mode?: 'default' | 'card';
  collectionKey: CollectionKey;
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
    overlayVisible: boolean;
    overlayContainer: HTMLDivElement;
  }
> {
  private player: Player;

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      overlayContainer: null,
      overlayVisible: false,
    };
  }

  public componentDidUpdate(prevProps: Readonly<OwnProps & StateProps>) {
    const prevVideoUri = prevProps.video.links.self.getOriginalLink();
    const currentVideoUri = this.props.video.links.self.getOriginalLink();

    if (this.player && prevVideoUri !== currentVideoUri) {
      this.player.loadVideo(currentVideoUri, this.props.segment);
    }
  }

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  private setPlayerRef = (player) => {
    this.player = player;
    this.player.onEnd((endOverlay: HTMLDivElement) =>
      this.handleVideoEnd(endOverlay),
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
        ratio: '16:9',
      };
    }

    return options;
  }

  public handleVideoEnd = (endOverlay) => {
    if (endOverlay.firstChild) {
      endOverlay.removeChild(endOverlay.firstChild);
    }
    this.setState({ overlayContainer: endOverlay });
    this.setState({ overlayVisible: true });
  };

  public replayOnClickDestroyOverlay = () => {
    this.setState({ overlayVisible: false });
    this.player.play();
  };

  private handleOnPlayback = (_, startSeconds: number, endSeconds: number) => {
    AnalyticsFactory.externalAnalytics().trackVideoPlayback(
      this.props.video,
      startSeconds,
      endSeconds,
    );
  };

  public render() {
    const { hasError, overlayContainer, overlayVisible } = this.state;

    const { shareCode, collectionKey, isAuthenticated, video } = this.props;

    if (hasError) {
      return null;
    }

    return (
      <div className="video-player">
        <LazyLoad key={video.id} offsetVertical={200}>
          <div>
            <EndOfVideoOverlay
              visible={overlayVisible}
              getOverlayContainer={overlayContainer}
              shareCode={shareCode}
              collectionKey={collectionKey}
              video={video}
              replayOnClick={() => this.replayOnClickDestroyOverlay()}
              userIsAuthenticated={isAuthenticated}
            />
            <PlayerComponent
              playerRef={this.setPlayerRef}
              options={this.getPlayerOptions()}
              videoUri={video.links.self.getOriginalLink()}
              segment={this.props.segment}
            />
          </div>
        </LazyLoad>
      </div>
    );
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
    shareCode: state.user?.shareCode,
    isAuthenticated: !!state.user,
  };
};

export default connect(mapStateToProps)(withMediaBreakPoint(VideoPlayer));
