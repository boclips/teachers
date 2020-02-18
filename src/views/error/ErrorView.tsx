import React from 'react';
import Row from 'antd/lib/grid/row';
import Col from 'antd/lib/grid/col';
import { Link } from 'react-router-dom';
import SadTeacher from 'resources/images/sad-teacher.svg';
import PageLayout from '../../components/layout/PageLayout';

interface Props {
  nonRecoverable?: boolean;
}
export const ErrorView = (props: Props) => (
  <PageLayout
    title="Something went wrong."
    showNavigation={!props.nonRecoverable}
    showFooter={true}
    showSearchBar={!props.nonRecoverable}
  >
    <section className="illustrated-page">
      <Row>
        <Col xs={{ span: 0 }} lg={{ span: 12 }}>
          <section className="illustration">
            <SadTeacher />
          </section>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <section className="message">
            <h1 className="big-title">Oops!!</h1>
            <p>Something went wrong.</p>
            {!props.nonRecoverable && (
              <p>
                You can start a new search or explore our subject list in the
                top bar or <Link to="/">return to the homepage</Link>
              </p>
            )}
          </section>
        </Col>
      </Row>
    </section>
  </PageLayout>
);
