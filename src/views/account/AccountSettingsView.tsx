import { Col, Row } from 'antd';
import React, { PureComponent } from 'react';
import AccountSettings from '../../components/account/accountSettings/AccountSettings';
import AccountSettingsSVG from '../../components/account/onboarding/dwarf-with-pencil.svg';
import PageLayout from '../../components/layout/PageLayout';
import './AccountSettingsView.less';

export class AccountSettingsView extends PureComponent {
  public render() {
    return (
      <PageLayout
        showFooter={true}
        showNavigation={true}
        showSearchBar={true}
        subheader={true}
      >
        <section data-qa="account-settings-page" className={'account-settings'}>
          <Row>
            <Col xs={{ span: 0 }} lg={{ span: 12 }}>
              <AccountSettingsSVG />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <AccountSettings />
            </Col>
          </Row>
        </section>
      </PageLayout>
    );
  }
}
