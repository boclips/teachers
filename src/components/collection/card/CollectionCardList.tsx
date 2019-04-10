import { Col, Row } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { VideoCollection } from '../../../types/VideoCollection';
import { CollectionCard } from './CollectionCard';
import CollectionCardContainer from './CollectionCardContainer';

interface InfiniteScrollProps {
  next: () => void;
  hasMore: boolean;
}
interface Props {
  collections: VideoCollection[];
  loading: boolean;
  title: string | React.ReactFragment;
  description?: string;
  tiny?: boolean;
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
    return this.props.collections
      .slice(0, this.props.maxNumberOfCollections)
      .map(collection => {
        return (
          <Col
            key={collection.id}
            xs={{ span: 24 }}
            md={{ span: this.props.tiny ? 12 : 24 }}
            lg={{ span: this.props.tiny ? 8 : 24 }}
          >
            <CollectionCardContainer
              tiny={this.props.tiny}
              collection={collection}
            />
          </Col>
        );
      });
  }

  public renderLoading() {
    return [0, 1, 2, 3, 4, 5].map(count => (
      <Col
        key={`sk-${count}`}
        xs={{ span: 24 }}
        md={{ span: this.props.tiny ? 12 : 24 }}
        lg={{ span: this.props.tiny ? 8 : 24 }}
      >
        <CollectionCard.Skeleton tiny={this.props.tiny} />
      </Col>
    ));
  }
}
