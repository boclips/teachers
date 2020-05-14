import BoclipsSecurity from 'boclips-js-security';
import { Player, PlayerOptions } from 'boclips-player';
import { Player as PlayerComponent } from 'boclips-player-react';
import LazyLoad from 'react-lazy-load';
import querystring from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { ShareModal } from 'src/components/common/share/ShareModal';
import { CollectionKey } from 'src/types/CollectionKey';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import MediaBreakpoints from '../../../types/MediaBreakpoints';
import State from '../../../types/State';
import { Segment, Video } from '../../../types/Video';
import {
  withMediaBreakPoint,
  WithMediaBreakPointProps,
} from '../../common/higherOrderComponents/withMediaBreakPoint';
import Share from '../../../../resources/images/share_white.svg';
import Save from '../../../../resources/images/save_white.svg';
import { VideoShareButtonForm } from '../sharing/VideoShareButton/VideoShareButton';
import ManageVideCollectionMenuContainer from '../buttons/videoCollection/ManageVideoCollectionMenuContainer';

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

const InvisibleButton = () => {
  const element = document.getElementById('video-player-save-button');
  const parentElement = element?.parentElement;
  const boundingRectangle = parentElement?.getBoundingClientRect();

  return (
    <button
      style={
        boundingRectangle && {
          top: boundingRectangle.top + 'px',
          left: boundingRectangle.left + 'px',
          height: boundingRectangle.height + 'px',
          width: boundingRectangle.width + -30 + 'px',
          position: 'fixed',
          display: 'inline-block',
        }
      }
      className="invisibleButton"
    />
  );
};
class VideoPlayer extends React.PureComponent<
  OwnProps & StateProps,
  {
    hasError: boolean;
    modalVisible: boolean;
    menuVisible: boolean;
  }
> {
  public state = {
    hasError: false,
    modalVisible: false,
    menuVisible: false,
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
              getContainer={() => document.getElementById('overlay')}
              title={'Share Video'}
              shareCode={this.props.shareCode}
            >
              <VideoShareButtonForm video={this.props.video} />
            </ShareModal>
            <ManageVideCollectionMenuContainer
              video={this.props.video}
              collectionKey={this.props.collectionKey}
              isMenuVisible={this.state.menuVisible}
              onVisibleChange={() => {
                this.setState({ menuVisible: !this.state.menuVisible });
              }}
              getPopupContainer={() => document.getElementById('overlay')}
              loading={false}
            >
              <InvisibleButton />
            </ManageVideCollectionMenuContainer>
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
        child: ReactDOMServer.renderToStaticMarkup(<Share />),
        onClick: () => {
          this.setState({ modalVisible: true });
        },
      },
      {
        child: ReactDOMServer.renderToStaticMarkup(
          <div id="video-player-save-button">
            <Save />
          </div>,
        ),
        onClick: () => {
          this.setState({ menuVisible: true });
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
