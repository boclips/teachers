import { Suspense } from 'react';
import React from 'react';
import { LoadingComponent } from '../../components/common/LoadingComponent';
import PageLayout from '../../components/layout/PageLayout';

const AccountSettingsView = React.lazy(() => import('./AccountSettingsView'));

export const AccountSettingsLazyView = () => (
  <PageLayout showFooter={true} showNavigation={true} showSearchBar={true}>
    <Suspense fallback={<LoadingComponent />}>
      <AccountSettingsView />
    </Suspense>
  </PageLayout>
);
