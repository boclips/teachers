import React from 'react';
import SearchResult from './SearchResult';

const SearchResultsPlaceholder = React.memo(() => (
  <SearchResult
    loading={true}
    searchId={null}
    video={null}
    isInCollection={false}
    onToggleInDefaultCollection={null}
  />
));

export const SearchResultsPlaceholders = React.memo(() => (
  <React.Fragment>
    {[1, 2, 3, 4, 5, 6].map((_, index) => (
      <SearchResultsPlaceholder key={index} />
    ))}
  </React.Fragment>
));
