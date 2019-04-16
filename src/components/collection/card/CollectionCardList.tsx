import { Col, Row } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { VideoCollection } from '../../../types/VideoCollection';
import { CollectionCard } from './CollectionCard';
import CollectionCardContainer from './CollectionCardContainer';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { uuid } from 'boclips-react-player/dist/src/uuid';

interface InfiniteScrollProps {
  next: () => void;
  hasMore: boolean;
}
interface Props {
  collections: VideoCollection[];
  loading: boolean;
  title: string | React.ReactFragment;
  description?: string;
  grid?: boolean;
  maxNumberOfCollections?: number;
  infiniteScroll?: InfiniteScrollProps;
}

export class CollectionCardList extends React.PureComponent<Props> {
  public render() {
    return (
      <React.Fragment>
        <h1 className="big-title alt">{this.props.title}</h1>

        {this.props.description && (
          <p className={'collection-list-description'}>
            {this.props.description}
          </p>
        )}

        <Row gutter={20}>
          {this.props.loading
            ? this.renderLoading()
            : this.props.collections &&
              (this.props.infiniteScroll ? (
                <InfiniteScroll
                  style={{ overflow: 'hidden' }}
                  dataLength={this.props.collections.length}
                  next={this.props.infiniteScroll.next}
                  hasMore={this.props.infiniteScroll.hasMore}
                  loader={this.renderLoading()}
                >
                  {this.renderCollections()}
                </InfiniteScroll>
              ) : (
                this.renderCollections()
              ))}
        </Row>
      </React.Fragment>
    );
  }

  private renderCollections() {
    return [
      <TransitionGroup exit={true} key={'collections-container'}>
        {this.props.collections
          .slice(0, this.props.maxNumberOfCollections)
          .map(collection => {
            return (
              <CSSTransition
                classNames="card-list"
                timeout={500}
                key={collection.id}
              >
                <Col
                  xs={{ span: 24 }}
                  md={{ span: this.props.grid ? 12 : 24 }}
                  lg={{ span: this.props.grid ? 8 : 24 }}
                >
                  <CollectionCardContainer
                    tiny={this.props.grid}
                    collection={collection}
                  />
                </Col>
              </CSSTransition>
            );
          })}
      </TransitionGroup>,
    ];
  }

  public renderLoading() {
    return [0, 1, 2, 3, 4, 5].map(count => (
      <Col
        key={`sk-${count}`}
        xs={{ span: 24 }}
        md={{ span: this.props.grid ? 12 : 24 }}
        lg={{ span: this.props.grid ? 8 : 24 }}
      >
        <CollectionCard.Skeleton tiny={this.props.grid} />
      </Col>
    ));
  }
}
