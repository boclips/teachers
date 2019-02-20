import React from 'react';
import VideoCard from '../../video/card/VideoCard';

const SearchResultsPlaceholder = React.memo(() => (
  <VideoCard video={null} videoIndex={null} style="search" />
));

export const SearchResultsPlaceholders = React.memo(() => (
  <React.Fragment>
    {[1, 2, 3, 4, 5, 6].map((_, index) => (
      <SearchResultsPlaceholder key={index} />
    ))}
  </React.Fragment>
));
