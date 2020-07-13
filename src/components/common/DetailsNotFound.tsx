import { Col, Row } from 'antd';
import SadTeacherSVG from 'resources/images/sad-teacher.svg';
import React from 'react';

interface Props {
  title: string;
  message: string;
  dataQa: string;
}

export const DetailsNotFound = ({ title, message, dataQa }: Props) => (
  <section className="illustrated-page" data-qa={dataQa}>
    <Row>
      <Col sm={{ span: 24 }} md={{ span: 8 }}>
        <section className="illustration">
          <SadTeacherSVG />
        </section>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 16 }}>
        <section className="message">
          <h1 className="big-title">{title}</h1>
          <p>{message}</p>
        </section>
      </Col>
    </Row>
  </section>
);
