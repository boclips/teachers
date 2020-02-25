import { Col, Row } from 'antd';
import EmptyCollectionSVG from 'resources/images/empty-collection.svg';
import React from 'react';

export const CollectionDetailsEmpty = () => (
  <Row data-qa="collection-view-empty" className="collection-view-empty">
    <Col md={{ offset: 6, span: 12 }} lg={{ offset: 8, span: 8 }}>
      <EmptyCollectionSVG />
      <h1 data-qa="collection-empty-title">This video collection is empty</h1>
      <p>
        You can add videos by searching for a topic and then clicking the Save
        button on your favorite videos
      </p>
    </Col>
  </Row>
);
