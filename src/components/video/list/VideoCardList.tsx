import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import SearchResultsCount from '../../searchResults/multiple-results/SearchResultsCount';
import VideoCard from '../card/VideoCard';
import './VideoCardList.less';

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
        <TransitionGroup exit={true}>
          {this.props.videos.map((video, index) => {
            return (
              <CSSTransition
                key={video.id}
                classNames="collection-video"
                timeout={500}
              >
                <VideoCard
                  video={video}
                  currentCollection={this.props.currentCollection}
                  videoIndex={index}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
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
