import { Suspense } from 'react';
import React from 'react';
import { LoadingComponent } from '../../components/common/LoadingComponent';
import PageLayout from '../../components/layout/PageLayout';

const VideoDetailsView = React.lazy(() => import('./VideoDetailsView'));

export interface VideoDetailsProps {
  videoId: string;
}

export const VideoDetailsLazyView = (props: VideoDetailsProps) => (
  <PageLayout showNavigation={true} showFooter={true} showSearchBar={true}>
    <Suspense fallback={<LoadingComponent />}>
      <VideoDetailsView {...props} />
    </Suspense>
  </PageLayout>
);
