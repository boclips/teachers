import React from 'react';
import { Video } from '../../../types/Video';
import SearchResultsCount from '../../searchResults/multiple-results/SearchResultsCount';
import VideoCard from '../card/VideoCard';

interface Props {
  videos: Video[];
  totalElements?: number;
}

interface GenericProps extends Props {
  style: 'collection' | 'search';
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
              style={this.props.style}
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
    return <GenericVideoCardList style="search" {...this.props} />;
  }
}

export class CollectionVideoCardList extends React.PureComponent<Props> {
  public render() {
    return <GenericVideoCardList style="collection" {...this.props} />;
  }
}
