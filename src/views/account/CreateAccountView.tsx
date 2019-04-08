import { Col, Row } from 'antd';
import React, { PureComponent } from 'react';
import registrationLogo from '../../../resources/images/registration-logo.svg';
import CreateAccountForm from '../../components/account/CreateAccountForm';
import PageLayout from '../../components/layout/PageLayout';
import './CreateAccountView.less';

export class CreateAccountView extends PureComponent {
  public render() {
    return (
      <PageLayout>
        <section className="create-account" data-qa="create-account-page">
          <Row>
            <Col xs={{ span: 0 }} lg={{ span: 12 }}>
              <img className="create-account__logo" src={registrationLogo} />
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

  public renderForm() {
    return <CreateAccountForm />;
  }
}
