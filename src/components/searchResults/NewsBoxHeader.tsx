import { Button, Col, Row } from 'antd';
import React from 'react';
import newsLogo from '../../../resources/images/news-logo.png';
import './NewsBox.less';
import { NewsBoxProps } from './NewsBoxProps';

export const NewsBoxHeader = React.memo((props: NewsBoxHeaderProps) => (
  <section data-qa="news-header" key={'news-box'} className="news-box">
    <Row type="flex" justify="space-between" align="middle">
      <Col>
        <p className="news-box__title text--secondary">
          <span>
            <img className="news-box__logo" src={newsLogo} alt="News icon" />
            {props.resultsQuery}{' '}
          </span>
          <span className="news-box__title--bold">On the news</span>
        </p>
      </Col>
      <Col>
        <Button onClick={props.onButtonClick} size="large" type="primary">
          Back
        </Button>
      </Col>
    </Row>
  </section>
));

interface NewsBoxHeaderProps extends NewsBoxProps {}
