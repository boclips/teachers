import axios from 'axios';
import { BoclipsPlayer, TrackerConfig } from 'boclips-react-player';
import { PlaybackConfig } from 'boclips-react-player/dist/src/PlaybackConfig';
import React from 'react';
import { connect } from 'react-redux';
import { LinksState } from '../../../../redux/State';
import {
  StreamPlayback,
  Video,
  YoutubePlayback,
} from '../../../../services/types/Video';
interface OwnProps {
  video: Video;
  searchId: string;
}

interface Props {
  trackingEndpoint: string;
}

export class VideoPlayer extends React.PureComponent<OwnProps & Props> {
  public render() {
    const { video, searchId, trackingEndpoint } = this.props;
    const trackerConfig: TrackerConfig = {
      onSegmentWatched: event => axios.post(trackingEndpoint, event),
      eventExtraData: {
        searchId,
        videoId: video.id,
      },
    };
    return (
      <BoclipsPlayer
        playbackConfig={this.toPlayerConfiguration(video.playback)}
        thumbnail={video.thumbnailUrl}
        trackerConfig={trackerConfig}
      />
    );
  }

  private toPlayerConfiguration(
    playback: StreamPlayback | YoutubePlayback,
  ): PlaybackConfig {
    if (playback instanceof StreamPlayback) {
      return {
        type: 'STREAM',
        stream: (playback as StreamPlayback).getUrl(),
      };
    } else if (playback instanceof YoutubePlayback) {
      return {
        type: 'YOUTUBE',
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
