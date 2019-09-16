import { Col, Row } from 'antd';
import React from 'react';

export default class AccountSettingsItem extends React.PureComponent<{
  label: string;
}> {
  public render() {
    return (
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <span className={'account-settings__item-label'}>
            {this.props.label}
          </span>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          {this.props.children}
        </Col>
      </Row>
    );
  }
}
