import React from 'react';
import { Video } from '../../types/Video';
import VideoCard from '../video/card/VideoCard';

interface Props {
  videos: Video[];
  collectionVideoIds: string[];
  searchId: string;
}

export class VideoCardList extends React.PureComponent<Props> {
  private isVideoInCollection = (video: Video) => {
    return this.props.collectionVideoIds.indexOf(video.id) > -1;
  };

  public render() {
    return (
      <React.Fragment>
        {this.props.videos.map(video => {
          return (
            <VideoCard
              key={video.id}
              video={video}
              searchId={this.props.searchId}
              isInCollection={this.isVideoInCollection(video)}
              style="search"
              dataQa="search-result"
            />
          );
        })}
      </React.Fragment>
    );
  }
}
