import { Suspense } from 'react';
import React from 'react';
import { LoadingComponent } from '../../components/common/LoadingComponent';
import PageLayout from '../../components/layout/PageLayout';

const OnboardingView = React.lazy(() => import('./OnboardingView'));

export const OnboardingLazyView = () => (
  <PageLayout showFooter={true}>
    <Suspense fallback={<LoadingComponent />}>
      <OnboardingView />
    </Suspense>
  </PageLayout>
);
