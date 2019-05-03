import { Col, Row } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { VideoCollection } from '../../../../types/VideoCollection';
import CollectionsLoaded from '../../CollectionsLoaded';
import { CollectionCard } from '../CollectionCard';
import CollectionCardContainer from '../CollectionCardContainer';

interface InfiniteScrollProps {
  next: () => void;
  hasMore: boolean;
}
interface Props {
  collections: VideoCollection[];
  title: string | React.ReactFragment;
  description?: string;
  grid?: boolean;
  maxNumberOfCollections?: number;
  infiniteScroll?: InfiniteScrollProps;
}

// TODO now all collection lists are pageable, this should just take a Pageable<VideoCollection> as props
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
          <CollectionsLoaded showWhenLoading={this.renderLoading()}>
            {this.props.collections &&
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
          </CollectionsLoaded>
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
