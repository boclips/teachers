import { Col } from 'antd';
import React from 'react';
import { VideoCard } from '../video/card/VideoCard';

const SearchResultsPlaceholder = React.memo(() => <VideoCard.Skeleton />);

export const VideoCardsPlaceholder = React.memo(() => (
  <React.Fragment>
    {[1, 2, 3, 4, 5, 6].map((_, index) => (
      <Col span={24} key={index}>
        <SearchResultsPlaceholder />
      </Col>
    ))}
  </React.Fragment>
));
