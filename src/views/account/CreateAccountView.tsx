import { replace } from 'connected-react-router';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import CreateAccountForm from '../../components/account/createAccount/CreateAccountForm';
import PageLayout from '../../components/layout/PageLayout';
import State from '../../types/State';
import './CreateAccountView.less';

interface StateProps {
  canCreateAccount: boolean;
}

interface DispatchProps {
  redirectToHomepage: () => {};
}

class CreateAccountView extends PureComponent<StateProps & DispatchProps> {
  public render() {
    return (
      <PageLayout title="Create Account" showFooter={true}>
        <section className="create-account" data-qa="create-account-page">
          <CreateAccountForm />
        </section>
      </PageLayout>
    );
  }

  public componentDidMount(): void {
    if (!this.props.canCreateAccount) {
      this.props.redirectToHomepage();
    }
  }
}

function mapStateToProps(state: State): StateProps {
  return {
    canCreateAccount: !!state.links.entries.createAccount,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    redirectToHomepage: () => dispatch(replace('/')),
  };
}

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccountView);
