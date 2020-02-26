import React from 'react';
import { Col, Row } from 'antd';
import InformationIcon from 'resources/images/dark.svg';

interface Props {
  shareCode: string;
}

export const ShareCode = React.memo((props: Props) => (
  <Row>
    <section className={'account-settings__sharecode-section'}>
      <Col xs={20} xl={16}>
        <section className={'account-settings__sharecode-heading'}>
          <span className={'account-settings__sharecode-icon'}>
            <InformationIcon />
          </span>
          <span className={'account-settings__item-label'}>
            Your share code
          </span>
        </section>
        <section className={'account-settings__sharecode-text'}>
          Make sure to attach this code when sharing resources so students can
          access them
        </section>
      </Col>
      <Col xs={4} xl={8}>
        <span className={'account-settings__sharecode'} data-qa="share-code">
          {props.shareCode}
        </span>
      </Col>
    </section>
  </Row>
));
