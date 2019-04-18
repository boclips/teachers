import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React from 'react';
import { Link } from 'react-router-dom';
import wavingHand from '../../../resources/images/waving-hand.png';
import PageLayout from '../../components/layout/PageLayout';

export default class LoggedOutView extends React.PureComponent {
  public render() {
    return (
      <PageLayout>
        <section className="illustrated-page">
          <Row>
            <Col sm={{ span: 24 }} md={{ span: 8 }}>
              <section className="illustration">
                <img src={wavingHand} alt="Waving hand illustration" />
              </section>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 16 }}>
              <section className="message">
                <h1 className="big-title">You're now logged out!</h1>
                <p>
                  We're sorry to see you go but hopefully will see you again
                  soon.
                </p>
                <p className="action">
                  <Link to={'/'}>Click here if you'd like to log in again</Link>
                </p>
              </section>
            </Col>
          </Row>
        </section>
      </PageLayout>
    );
  }
}
