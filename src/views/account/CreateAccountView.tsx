import { Col, Row } from 'antd';
import React, { PureComponent } from 'react';
import RegistrationLogoSVG from '../../../resources/images/registration-logo.svg';
import CreateAccountForm from '../../components/account/createAccount/CreateAccountForm';
import PageLayout from '../../components/layout/PageLayout';
import './CreateAccountView.less';

export class CreateAccountView extends PureComponent {
  public render() {
    return (
      <PageLayout showNavigation={true} showFooter={true}>
        <section className="create-account" data-qa="create-account-page">
          <Row>
            <Col xs={{ span: 0 }} lg={{ span: 12 }}>
              <RegistrationLogoSVG className="create-account__logo" />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <div className="create-account__form">
                <CreateAccountForm />
              </div>
            </Col>
          </Row>
        </section>
      </PageLayout>
    );
  }
}
