import React from 'react';
import { Video } from 'src/types/Video';
import { VideoCollection } from 'src/types/VideoCollection';
import { Card, Skeleton as AntSkeleton } from 'antd';

export interface Props {
  video: Video | null;
  videoIndex?: number;
  currentCollection?: VideoCollection;
  referer?: string;
}

export const VideoCardSkeleton = () => (
  <Card className="video-card skeleton" bordered={false}>
    <AntSkeleton
      loading={true}
      active={true}
      title={{ width: '150px' }}
      paragraph={{ rows: 5 }}
      avatar={{ shape: 'square', size: 'large' }}
    />
  </Card>
);

export const VideoCard = (): any => <div>this is a video card</div>;
