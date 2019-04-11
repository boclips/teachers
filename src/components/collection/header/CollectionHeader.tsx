import { Card, Col, Row } from 'antd';
import { Skeleton as AntSkeleton } from 'antd';
import React from 'react';
import { VideoCollection } from '../../../types/VideoCollection';
import BookmarkCollectionButton from '../card/BookmarkCollectionButton';
import { CollectionSubtitle } from '../CollectionSubtitle';
import CollectionEditButtonContainer from './CollectionEditButtonContainer';
import './CollectionHeader.less';
import { CollectionTitle } from './CollectionTitle';

interface Props {
  collection: VideoCollection;
}

export default class CollectionHeader extends React.PureComponent<Props> {
  public render() {
    return (
      <React.Fragment>
        <Row type="flex" justify="space-between">
          <Col>
            <CollectionTitle
              title={this.props.collection.title}
              isPublic={this.props.collection.isPublic}
              isMine={this.props.collection.isMine}
            />
          </Col>
          <Col>
            <CollectionEditButtonContainer collection={this.props.collection} />
            <BookmarkCollectionButton collection={this.props.collection} />
          </Col>
        </Row>
        <CollectionSubtitle collection={this.props.collection} />
      </React.Fragment>
    );
  }

  public static Skeleton = () => (
    <section className="collection-header__skeleton">
      <Card className="video-card" bordered={false}>
        <AntSkeleton
          loading={true}
          title={true}
          paragraph={false}
          active={true}
          avatar={{ size: 'small', shape: 'circle' }}
        />
      </Card>
    </section>
  );
}
