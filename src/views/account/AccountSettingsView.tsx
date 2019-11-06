import { Col, Row } from 'antd';
import React, { PureComponent } from 'react';
import AccountSettings from '../../components/account/accountSettings/AccountSettings';
import AccountSettingsSVG from '../../components/account/onboarding/dwarf-with-pencil.svg';
import PageLayout from '../../components/layout/PageLayout';

export class AccountSettingsView extends PureComponent {
  public render() {
    return (
      <PageLayout
        title="Settings"
        showFooter={true}
        showNavigation={true}
        showSearchBar={true}
        subheader={true}
      >
        <section data-qa="account-settings-page" className={'illustrated-page'}>
          <Row>
            <Col xs={{ span: 0 }} lg={{ span: 12 }}>
              <section className="illustration">
                <AccountSettingsSVG />
              </section>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <section className="content">
                <AccountSettings />
              </section>
            </Col>
          </Row>
        </section>
      </PageLayout>
    );
  }
}
