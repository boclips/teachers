import { Col } from 'antd';
import React, { Suspense } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { VideoCardsPlaceholder } from '../../components/searchResults/multiple-results/VideoCardsPlaceholder';
import { SearchResultsSidebar } from '../../components/searchResults/SearchResultsSidebar';

const SearchResultsView = React.lazy(() => import('./SearchResultsView'));

export const SearchResultsLazyView = () => (
  <PageLayout
    showTabs={true}
    showNavigation={true}
    showFooter={true}
    showSearchBar={true}
  >
    <Suspense fallback={<SearchResultsViewSkeleton isNewsMode={false} />}>
      <SearchResultsView />
    </Suspense>
  </PageLayout>
);

export const SearchResultsViewSkeleton = ({
  isNewsMode,
}: {
  isNewsMode: Boolean;
}) => (
  <section
    className="search-results-placeholders"
    data-qa="search-results-placeholders"
  >
    <Col xs={{ span: 24 }} xl={{ span: isNewsMode ? 24 : 18 }}>
      <VideoCardsPlaceholder />
    </Col>
    {!isNewsMode && (
      <Col xs={{ span: 0 }} xl={{ span: 5 }}>
        <SearchResultsSidebar.Skeleton />
      </Col>
    )}
  </section>
);
