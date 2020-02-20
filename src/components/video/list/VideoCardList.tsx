import { Col, Row } from 'antd';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Video } from '../../../types/Video';
import { VideoCollection } from '../../../types/VideoCollection';
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
      <Row gutter={[20, 20]}>
        <ul className={'video-card-list'}>
          <TransitionGroup component={null} exit={true}>
            {this.props.videos.map((video, index) => (
              <CSSTransition
                key={video ? video.id : index}
                classNames="card-list"
                timeout={500}
              >
                <li>
                  <Col span={24}>
                    <VideoCard
                      video={video}
                      currentCollection={this.props.currentCollection}
                      videoIndex={index}
                    />
                  </Col>
                </li>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ul>
      </Row>
    );
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
