import React, { PureComponent } from 'react';
import CreateAccountForm from '../../components/account/CreateAccountForm';
import PageLayout from '../../components/layout/PageLayout';
import './CreateAccountView.less';

export class CreateAccountView extends PureComponent {
  public render() {
    return (
      <PageLayout>
        <section className="create-account" data-qa="create-account-page">
          {this.renderForm()}
        </section>
      </PageLayout>
    );
  }

  public renderForm() {
    return <CreateAccountForm />;
  }
}
