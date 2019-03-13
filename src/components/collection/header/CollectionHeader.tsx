import { Col, Row } from 'antd';
import React from 'react';
import { VideoCollection } from '../../../types/VideoCollection';
import { CollectionSubtitle } from '../CollectionSubtitle';
import CollectionEditButtonContainer from './CollectionEditButtonContainer';
import { CollectionTitle } from './CollectionTitle';

interface Props {
  collection: VideoCollection;
}

export default class CollectionHeader extends React.PureComponent<Props> {
  public render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <CollectionTitle
              title={this.props.collection.title}
              isPublic={this.props.collection.isPublic}
            />
          </Col>
          <Col>
            <CollectionEditButtonContainer collection={this.props.collection} />
          </Col>
        </Row>
        <CollectionSubtitle collection={this.props.collection} />
      </React.Fragment>
    );
  }
}
