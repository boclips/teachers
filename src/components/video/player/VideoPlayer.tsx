import axios from 'axios';
import { BoclipsPlayer, TrackerConfig } from 'boclips-react-player';
import { PlaybackConfig } from 'boclips-react-player/dist/src/PlaybackConfig';
import { PlayerControls } from 'boclips-react-player/dist/src/Player';
import React from 'react';
import { connect } from 'react-redux';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { LinksState } from '../../../types/State';
import { StreamPlayback, Video, YoutubePlayback } from '../../../types/Video';

interface OwnProps {
  video: Video;
  videoIndex?: number;
  controls?: 'default' | 'thumbnail';
}

interface Props {
  trackingEndpoint: string;
}

export class VideoPlayer extends React.PureComponent<OwnProps & Props> {
  public render() {
    const { video, trackingEndpoint } = this.props;
    const trackerConfig: TrackerConfig = {
      onSegmentWatched: event => {
        axios.post(trackingEndpoint, event);
        AnalyticsFactory.getInstance().trackVideoPlayback(video, event);
      },
      eventExtraData: {
        videoId: video.id,
        videoIndex: this.props.videoIndex,
      },
    };
    return (
      <BoclipsPlayer
        playbackConfig={this.toPlayerConfiguration(video.playback)}
        thumbnail={video.thumbnailUrl}
        trackerConfig={trackerConfig}
        controls={this.getControls(this.props.controls)}
      />
    );
  }

  private getControls(mode: 'default' | 'thumbnail') {
    if (!mode || mode === 'default') {
      return PlayerControls.DEFAULT;
    } else {
      return PlayerControls.BIG_PLAY_ONLY;
    }
  }

  private toPlayerConfiguration(
    playback: StreamPlayback | YoutubePlayback,
  ): PlaybackConfig {
    const durationSeconds = this.props.video.duration.asSeconds();
    if (playback instanceof StreamPlayback) {
      return {
        type: 'STREAM',
        durationSeconds,
        stream: (playback as StreamPlayback).getUrl(),
      };
    } else if (playback instanceof YoutubePlayback) {
      return {
        type: 'YOUTUBE',
        durationSeconds,
        youtubeId: (playback as YoutubePlayback).getId(),
      };
    }

    throw Error(`Could not extract player configuration from ${playback}`);
  }
}

function mapStateToProps(state: LinksState): Props {
  return {
    trackingEndpoint: state.links.createPlaybackEvent.getOriginalLink(),
  };
}

export default connect(mapStateToProps)(VideoPlayer);
