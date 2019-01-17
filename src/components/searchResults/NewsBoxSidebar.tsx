import { Button, Col, Row } from 'antd';
import React from 'react';
import newsLogo from '../../../resources/images/news-logo.png';
import './NewsBox.less';
import { NewsBoxProps } from './NewsBoxProps';

export const NewsBoxSidebar = React.memo((props: NewBoxSidePanelPropls) => (
  <Row type="flex" justify="center">
    <section
      data-qa="news-side-panel"
      key={'news-box'}
      className="news-box news-box__side-panel"
    >
      <Row type="flex" justify="center">
        <Col>
          <img className="news-box__logo" src={newsLogo} />
        </Col>
        <Col>
          <div className="news-box__title-container">
            <p className="news-box__title text--secondary">
              {props.resultsQuery}
            </p>
            <p className="news-box__title news-box__title--bold text--secondary">
              On the news
            </p>
          </div>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Button onClick={props.onButtonClick} size="large">
          View News
        </Button>
      </Row>
    </section>
  </Row>
));

interface NewBoxSidePanelPropls extends NewsBoxProps {}
