import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { replace } from 'connected-react-router';
import OnboardingForm from '../../components/account/onboarding/OnboardingForm';
import PageLayout from '../../components/layout/PageLayout';
import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';
import './OnboardingView.less';
import State from '../../types/State';

interface StateProps {
  userCanActivate: boolean;
}

interface DispatchProps {
  redirectToHomepage: () => void;
}

export class OnboardingViewComponent extends PureComponent<
  StateProps & DispatchProps
> {
  public render() {
    if (!this.props.userCanActivate) {
      return null;
    }

    return (
      <PageLayout title="Welcome" showFooter={true}>
        <section className="onboarding" data-qa="onboarding-page">
          <div className="onboarding__form">
            <OnboardingForm />
          </div>
        </section>
      </PageLayout>
    );
  }

  public componentDidMount(): void {
    if (!this.props.userCanActivate) {
      this.props.redirectToHomepage();
    } else {
      AnalyticsFactory.externalAnalytics().trackOnboardingStarted();
    }
  }
}

const mapStateToProps = (state: State): StateProps => ({
  userCanActivate: !!state.links.activate,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  redirectToHomepage: () => {
    dispatch(replace('/'));
  },
});

export const OnboardingView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardingViewComponent);
