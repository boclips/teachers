import { Col, Row } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { VideoCollection } from '../../../../types/VideoCollection';
import CollectionsLoaded from '../../CollectionsLoaded';
import { CollectionCard } from '../CollectionCard';
import CollectionCardContainer from '../CollectionCardContainer';
import { PageableCollectionCardListProps } from './PageableCollectionCardList';

interface InfiniteScrollProps {
  next: () => void;
  hasMore: boolean;
}
export interface CollectionCardListProps
  extends PageableCollectionCardListProps {
  collections: VideoCollection[];
  infiniteScroll?: InfiniteScrollProps;
}

export class CollectionCardList extends React.PureComponent<
  CollectionCardListProps
> {
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
        {this.props.collections &&
          this.props.collections
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
                    md={{
                      span: this.singleColumn() ? 24 : 12,
                    }}
                    lg={{ span: this.singleColumn() ? 24 : 8 }}
                  >
                    <CollectionCardContainer
                      tiny={this.props.grid || this.props.sidebar}
                      collection={collection}
                    />
                  </Col>
                </CSSTransition>
              );
            })}
      </TransitionGroup>,
    ];
  }

  private singleColumn() {
    return this.props.sidebar || !this.props.grid;
  }

  public renderLoading() {
    return [0, 1, 2, 3, 4, 5].map(count => (
      <Col
        key={`sk-${count}`}
        xs={{ span: 24 }}
        md={{ span: this.singleColumn() ? 24 : 12 }}
        lg={{ span: this.singleColumn() ? 24 : 8 }}
      >
        <CollectionCard.Skeleton tiny={this.props.grid} />
      </Col>
    ));
  }
}
