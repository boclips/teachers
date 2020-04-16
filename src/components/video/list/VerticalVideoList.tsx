import React from 'react';
import VideoPreview from '../preview/VideoPreview';
import './VerticalVideoList.less';

interface Props {
  videoIds: string[];
}

export default class VerticalVideoList extends React.PureComponent<Props> {
  public render() {
    return (
      <div className={'video-list'}>
        {this.props.videoIds.map((videoId) => (
          <VideoPreview videoId={videoId} key={videoId} />
        ))}
      </div>
    );
  }
}
