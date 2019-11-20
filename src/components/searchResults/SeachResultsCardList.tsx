import { zip } from 'lodash';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Video } from '../../types/Video';
import { VideoCollection } from '../../types/VideoCollection';
import CollectionCardContainer from '../collection/card/CollectionCardContainer';
import { VideoCard } from '../video/card/VideoCard';
import './SearchResultsCardList.less';

interface Props {
  videos: Video[];
  collections?: VideoCollection[];
  totalElements?: number;
}

export class SearchResultsCardList extends React.PureComponent<Props> {
  public render() {
    return (
      <TransitionGroup exit={true}>
        {zip(this.props.videos, this.props.collections).map(
          ([video, collection], index) => (
            <CSSTransition key={index} classNames="card-list" timeout={500}>
              <div>
                {video && <VideoCard video={video} videoIndex={index} />}
                {collection && (
                  <CollectionCardContainer collection={collection} />
                )}
              </div>
            </CSSTransition>
          ),
        )}
      </TransitionGroup>
    );
  }
}
