import React, { PureComponent } from 'react';
import OnboardingForm from '../../components/account/OnboardingForm';
import PageLayout from '../../components/layout/PageLayout';
import './OnboardingView.less';

export class OnboardingView extends PureComponent {
  public render() {
    return (
      <PageLayout>
        <section className="onboarding" data-qa="onboarding-page">
          <div className="onboarding__form">
            <OnboardingForm />
          </div>
        </section>
      </PageLayout>
    );
  }
}
