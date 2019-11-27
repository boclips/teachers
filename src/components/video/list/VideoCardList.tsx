import { Col } from 'antd';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
import { FiniteGrid } from '../../common/Grid/FiniteGrid';
import { VideoCard } from '../card/VideoCard';
import './VideoCardList.less';

interface Props {
  videos: Video[];
  userId: string | null;
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
      <FiniteGrid>
        <TransitionGroup component={null} exit={true}>
          {this.props.videos.map((video, index) => (
            <CSSTransition
              key={video ? video.id : index}
              classNames="card-list"
              timeout={500}
            >
              <Col span={24}>
                <VideoCard
                  video={video}
                  currentCollection={this.props.currentCollection}
                  videoIndex={index}
                />
              </Col>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </FiniteGrid>
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
