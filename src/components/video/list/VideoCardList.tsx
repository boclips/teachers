import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useRefererIdInjector } from 'src/hooks/useRefererIdInjector';
import State from 'src/types/State';
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

const GenericVideoCardList = React.memo<GenericProps>((props) => {
  const isAuthenticated: boolean = useSelector((state: State) => !!state.user);
  const referer = useRefererIdInjector();

  return (
    <Row gutter={[20, 20]}>
      <ul className={'video-card-list'}>
        <TransitionGroup component={null} exit={true}>
          {props.videos.map((video, index) => (
            <CSSTransition
              key={video ? video.id : index}
              classNames="card-list"
              timeout={500}
            >
              <li>
                <Col span={24}>
                  <VideoCard
                    video={video}
                    currentCollection={props.currentCollection}
                    videoIndex={index}
                    referer={isAuthenticated ? undefined : referer}
                  />
                </Col>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    </Row>
  );
});

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
