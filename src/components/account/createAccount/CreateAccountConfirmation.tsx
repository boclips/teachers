import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import wavingHand from 'resources/images/waving-hand.png';

export class CreateAccountConfirmation extends React.Component {
  public render() {
    return (
      <section className="illustrated-page">
        <Row>
          <Col sm={{ span: 24 }} md={{ span: 8 }}>
            <section className="illustration">
              <img
                src={wavingHand}
                alt="A hand waving with colourful dots flying around"
              />
            </section>
          </Col>
          <Col sm={{ span: 24 }} md={{ span: 16 }}>
            <section className="message">
              <h1 className="big-title">Welcome to Boclips for teachers!</h1>
              <p>
                Thanks for registering. Please login to activate your account.
              </p>
              <p className="action">
                <Link to={'/'}>Click here to log in</Link>
              </p>
            </section>
          </Col>
        </Row>
      </section>
    );
  }
}
