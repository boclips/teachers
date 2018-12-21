import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React from 'react';
import { Link } from 'react-router-dom';
import wavingHand from '../../../resources/images/waving-hand.png';
import TopSearchBarLayout from '../../components/searchBar/TopSearchBarLayout';

export default class LoggedOutView extends React.PureComponent {
  public render() {
    const fixedHeight = { minHeight: '230px' };
    return (
      <TopSearchBarLayout>
        <section className="illustrated-page">
          <Row>
            <Col sm={{ span: 24 }} md={{ span: 8 }}>
              <section className="illustration" style={fixedHeight}>
                <img src={wavingHand} />
              </section>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 16 }}>
              <section className="message" style={fixedHeight}>
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
      </TopSearchBarLayout>
    );
  }
}
