import { Col, Row } from 'antd';
import SadTeacherSVG from 'resources/images/sad-teacher.svg';
import React from 'react';

export const CollectionDetailsNotFound = () => (
  <section className="illustrated-page" data-qa="collection-not-found">
    <Row>
      <Col sm={{ span: 24 }} md={{ span: 8 }}>
        <section className="illustration">
          <SadTeacherSVG />
        </section>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 16 }}>
        <section className="message">
          <h1 className="big-title">Oops!!</h1>
          <p>The collection you tried to access is not available.</p>
        </section>
      </Col>
    </Row>
  </section>
);
