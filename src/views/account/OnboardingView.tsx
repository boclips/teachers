import React, { PureComponent } from 'react';
import OnboardingForm from '../../components/account/onboarding/OnboardingForm';
import PageLayout from '../../components/layout/PageLayout';
import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';
import './OnboardingView.less';

export default class OnboardingView extends PureComponent {
  public render() {
    return (
      <PageLayout showFooter={true}>
        <section className="onboarding" data-qa="onboarding-page">
          <div className="onboarding__form">
            <OnboardingForm />
          </div>
        </section>
      </PageLayout>
    );
  }

  public componentDidMount(): void {
    AnalyticsFactory.externalAnalytics().trackOnboardingStarted();
  }
}
