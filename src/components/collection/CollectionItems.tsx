import React from 'react';
import { Video } from '../../types/Video';
import VideoCard from '../video/card/VideoCard';

interface Props {
  videos: Video[];
}

export default class CollectionItems extends React.PureComponent<Props> {
  public render() {
    return (
      <React.Fragment>
        {this.props.videos.map(video => {
          return (
            <VideoCard
              key={video.id}
              video={video}
              isInCollection={true}
              searchId={null}
              style="collection"
              dataQa="collection-video"
            />
          );
        })}
      </React.Fragment>
    );
  }
}
