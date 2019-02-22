import React from 'react';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import SearchResultsCount from '../../searchResults/multiple-results/SearchResultsCount';
import VideoCard from '../card/VideoCard';

interface Props {
  videos: Video[];
  totalElements?: number;
}

interface GenericProps extends Props {
  currentCollection?: VideoCollection;
}
interface CollectionProps extends Props {
  currentCollection: VideoCollection;
}

class GenericVideoCardList extends React.PureComponent<GenericProps> {
  public render() {
    return (
      <React.Fragment>
        <SearchResultsCount count={this.props.totalElements} />
        {this.props.videos.map((video, index) => {
          return (
            <VideoCard
              key={video.id}
              video={video}
              currentCollection={this.props.currentCollection}
              videoIndex={index}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export class SearchVideoCardList extends React.PureComponent<Props> {
  public render() {
    return <GenericVideoCardList {...this.props} />;
  }
}

export class CollectionVideoCardList extends React.PureComponent<
  CollectionProps
> {
  public render() {
    return (
      <GenericVideoCardList
        currentCollection={this.props.currentCollection}
        {...this.props}
      />
    );
  }
}
