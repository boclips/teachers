import React, { Suspense } from 'react';
import { LoadingComponent } from '../../components/common/LoadingComponent';
import PageLayout from '../../components/layout/PageLayout';
const CreateAccountView = React.lazy(() => import('./CreateAccountView'));

export const CreateAccountLazyView = () => (
  <PageLayout showFooter={true}>
    <Suspense fallback={<LoadingComponent />}>
      <CreateAccountView />
    </Suspense>
  </PageLayout>
);
