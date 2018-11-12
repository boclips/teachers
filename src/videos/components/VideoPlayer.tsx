import axios from 'axios';
import { BoclipsPlayer, TrackerConfig } from 'boclips-react-player';
import React from 'react';
import { connect } from 'react-redux';
import { LinksState } from '../../State';
import { Video } from '../Video';

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
        playbackConfig={{
          type: 'STREAM',
          stream: video.streamUrl,
        }}
        thumbnail={video.thumbnailUrl}
        trackerConfig={trackerConfig}
      />
    );
  }
}

function mapStateToProps(state: LinksState): Props {
  return {
    trackingEndpoint: state.links.createPlaybackEvent.getLink(),
  };
}

export default connect(mapStateToProps)(VideoPlayer);
