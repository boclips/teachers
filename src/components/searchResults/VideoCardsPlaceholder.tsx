import { Col } from 'antd';
import React from 'react';
import { VideoCardSkeleton } from '../video/card/VideoCard';

const SearchResultsPlaceholder = React.memo(() => <VideoCardSkeleton />);

export const VideoCardsPlaceholder = React.memo(() => (
  <>
    {[1, 2, 3, 4, 5, 6].map((number) => (
      <Col span={24} key={number}>
        <SearchResultsPlaceholder />
      </Col>
    ))}
  </>
));
