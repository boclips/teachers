import { Col } from 'antd';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { VideoCollection } from '../../../../types/VideoCollection';
import CollectionsLoaded from '../../CollectionsLoaded';
import { CollectionCard } from '../CollectionCard';
import CollectionCardContainer from '../CollectionCardContainer';
import { FiniteGrid } from '../../../common/Grid/FiniteGrid';
import { InfiniteGrid } from '../../../common/Grid/InfiniteGrid';
import { CollectionCardTiny } from '../CollectionCardTiny';
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

        {this.renderCollectionGrid()}
      </React.Fragment>
    );
  }

  private renderCollectionGrid() {
    if (this.props.collections && this.props.infiniteScroll) {
      return (
        <InfiniteGrid
          dataLength={this.props.collections.length}
          next={this.props.infiniteScroll.next}
          hasMore={this.props.infiniteScroll.hasMore}
          loader={this.renderLoading()}
        >
          {this.renderCollections()}
        </InfiniteGrid>
      );
    }
    return (
      <FiniteGrid>
        <CollectionsLoaded showWhileLoading={this.renderLoading()}>
          {this.renderCollections()}
        </CollectionsLoaded>
      </FiniteGrid>
    );
  }

  private renderCollections() {
    return [
      <TransitionGroup
        component={null}
        exit={true}
        key={'collections-container'}
      >
        {this.props.emptyPlaceholder &&
          (!this.props.collections || !this.props.collections.length) && (
            <CSSTransition
              classNames="card-list"
              timeout={500}
              key="empty-placeholder"
            >
              <section
                className="collection-empty-placeholder"
                data-qa="empty-placeholder"
              >
                <Col xs={{ span: 24 }}>{this.props.emptyPlaceholder}</Col>
              </section>
            </CSSTransition>
          )}
        {this.props.collections &&
          this.props.collections
            .slice(0, this.props.maxNumberOfCollections)
            .map(collection => (
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
                    mode={this.props.grid ? 'tiny' : 'regular'}
                    collection={collection}
                  />
                </Col>
              </CSSTransition>
            ))}
      </TransitionGroup>,
    ];
  }

  private singleColumn() {
    return !this.props.grid;
  }

  public renderLoading() {
    return [0, 1, 2, 3, 4, 5].map(count => (
      <Col
        key={`sk-${count}`}
        xs={{ span: 24 }}
        md={{ span: this.singleColumn() ? 24 : 12 }}
        lg={{ span: this.singleColumn() ? 24 : 8 }}
      >
        {this.props.grid ? (
          <CollectionCard.Skeleton />
        ) : (
          <CollectionCardTiny.Skeleton />
        )}
      </Col>
    ));
  }
}
