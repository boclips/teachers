import { Col, Row } from 'antd';
import React from 'react';
import collections from '../../../../resources/images/collections.png';
import { VideoCollection } from '../../../types/VideoCollection';
import { CollectionCard } from './CollectionCard';
import CollectionCardContainer from './CollectionCardContainer';

interface Props {
  collections: VideoCollection[];
  loading: boolean;
  title: string;
  description?: string;
  tiny?: boolean;
}

export class CollectionCardList extends React.PureComponent<Props> {
  public render() {
    return (
      <React.Fragment>
        <h1 className="big-title alt">
          {' '}
          <img src={collections} /> {this.props.title}
        </h1>
        {this.props.description && (
          <p className={'collection-list-description'}>
            {this.props.description}
          </p>
        )}
        {this.props.loading
          ? this.renderLoading()
          : this.props.collections && (
              <Row gutter={this.props.tiny ? 20 : 0}>
                {this.props.collections.map(collection => {
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
                })}
              </Row>
            )}
      </React.Fragment>
    );
  }

  public renderLoading() {
    return [
      <CollectionCard.Skeleton key={1} />,
      <CollectionCard.Skeleton key={2} />,
      <CollectionCard.Skeleton key={3} />,
    ];
  }
}
