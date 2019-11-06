import React, { PureComponent } from 'react';
import CreateAccountForm from '../../components/account/createAccount/CreateAccountForm';
import PageLayout from '../../components/layout/PageLayout';
import './CreateAccountView.less';

export class CreateAccountView extends PureComponent {
  public render() {
    return (
      <PageLayout title="Create Account" showFooter={true}>
        <section className="create-account" data-qa="create-account-page">
          <CreateAccountForm />
        </section>
      </PageLayout>
    );
  }
}
