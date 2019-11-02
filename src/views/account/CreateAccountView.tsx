import React, { PureComponent } from 'react';
import CreateAccountForm from '../../components/account/createAccount/CreateAccountForm';
import './CreateAccountView.less';

export default class CreateAccountView extends PureComponent {
  public render() {
    return (
      <section className="create-account" data-qa="create-account-page">
        <CreateAccountForm />
      </section>
    );
  }
}
