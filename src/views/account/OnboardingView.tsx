import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { replace } from 'connected-react-router';
import { PlatformInteractionType } from 'src/services/analytics/boclips/PlatformInteractionType';
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
  public componentDidMount(): void {
    const { userCanActivate, redirectToHomepage } = this.props;
    if (!userCanActivate) {
      redirectToHomepage();
    } else {
      AnalyticsFactory.internalAnalytics().trackPlatformInteraction(
        PlatformInteractionType.ONBOARDING_PAGE_1_STARTED,
        true,
      );
      AnalyticsFactory.externalAnalytics().trackOnboardingStarted();
    }
  }

  public render() {
    const { userCanActivate } = this.props;

    if (!userCanActivate) {
      return null;
    }

    return (
      <PageLayout title="Welcome" showFooter>
        <section className="onboarding" data-qa="onboarding-page">
          <div className="onboarding__form">
            <OnboardingForm />
          </div>
        </section>
      </PageLayout>
    );
  }
}

const mapStateToProps = (state: State): StateProps => ({
  userCanActivate: !!state.links.entries.activate,
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
