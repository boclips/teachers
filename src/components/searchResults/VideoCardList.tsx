import React from 'react';
import { Video } from '../../types/Video';
import VideoCard from '../video/card/VideoCard';

interface Props {
  videos: Video[];
  isInCollection: (videoId: string) => boolean;
  searchId: string;
}

interface GenericProps extends Props {
  style: 'collection' | 'search';
  dataQa: string;
}

class GenericVideoCardList extends React.PureComponent<GenericProps> {
  public render() {
    return (
      <React.Fragment>
        {this.props.videos.map(video => {
          return (
            <VideoCard
              key={video.id}
              video={video}
              searchId={this.props.searchId}
              isInCollection={this.props.isInCollection(video.id)}
              style={this.props.style}
              dataQa={this.props.dataQa}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export class SearchVideoCardList extends React.PureComponent<Props> {
  public render() {
    return (
      <GenericVideoCardList
        style="search"
        dataQa="search-result"
        {...this.props}
      />
    );
  }
}

export class CollectionVideoCardList extends React.PureComponent<Props> {
  public render() {
    return (
      <GenericVideoCardList
        style="collection"
        dataQa="collection-video"
        {...this.props}
      />
    );
  }
}
