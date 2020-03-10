import { Col } from 'antd';
import zip from 'lodash/zip';
import flattenDeep from 'lodash/flattenDeep';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Video } from '../../types/Video';
import { VideoCollection } from '../../types/VideoCollection';
import CollectionCardContainer from '../collection/card/CollectionCardContainer';
import { FiniteGrid } from '../common/Grid/FiniteGrid';
import { VideoCard } from '../video/card/VideoCard';
import './SearchResultsCardList.less';
import './FiltersBar.less';

interface Props {
  videos: Video[];
  collections?: VideoCollection[];
  totalElements?: number;
}

export class SearchResultsCardList extends React.PureComponent<Props> {
  public render() {
    const videoCards: React.ReactElement[] = this.props.videos.map(
      (video, index) => (
        <VideoCard video={video} videoIndex={index} key={video.id} />
      ),
    );
    const collectionCards: React.ReactElement[] = this.props.collections.map(
      collection => (
        <CollectionCardContainer
          grid={false}
          collection={collection}
          key={collection.id}
        />
      ),
    );

    const videosAndCollectionElements: React.ReactElement[] = flattenDeep(
      zip(videoCards, collectionCards),
    ).filter(element => typeof element !== 'undefined');

    return (
      <FiniteGrid gutter={[32, 32]}>
        <TransitionGroup component={null} exit={true}>
          {videosAndCollectionElements.map((element, index) => (
            <CSSTransition key={index} classNames="card-list" timeout={500}>
              <Col span={24} key={element.key}>
                {element}
              </Col>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </FiniteGrid>
    );
  }
}
