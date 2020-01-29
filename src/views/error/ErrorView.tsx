import React from 'react';
import Row from 'antd/lib/grid/row';
import Col from 'antd/lib/grid/col';
import { Link } from 'react-router-dom';
import SadTeacher from '../../../resources/images/sad-teacher.svg';
import PageLayout from '../../components/layout/PageLayout';

export const ErrorView = () => (
  <PageLayout
    title="Something went wrong."
    showNavigation={true}
    showFooter={true}
    showSearchBar={true}
  >
    <section className="illustrated-page">
      <Row>
        <Col sm={{ span: 24 }} md={{ span: 12 }}>
          <section className="illustration">
            <SadTeacher />
          </section>
        </Col>
        <Col sm={{ span: 24 }} md={{ span: 12 }}>
          <section className="message">
            <h1 className="big-title">Oops!!</h1>
            <p>Something went wrong.</p>
            <p>
              You can start a new search or explore our subject list in the top
              bar or <Link to="/">return to the homepage</Link>
            </p>
          </section>
        </Col>
      </Row>
    </section>
  </PageLayout>
);
