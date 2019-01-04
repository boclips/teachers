import { Skeleton } from 'antd';
import React from 'react';
import { Video } from '../../../types/Video';
import VideoDetailCard from '../components/card/VideoDetailCard';

interface Props {
  video: Video | null;
}

function RenderVideoDetails({ video }: Props) {
  if (!video) {
    return null;
  }

  return (
    <section>
      <VideoDetailCard video={video} searchId={null} />
    </section>
  );
}

export default class VideoDetails extends React.PureComponent<Props> {
  public render() {
    const { video } = this.props;
    return (
      <section className="video-details">
        <Skeleton
          loading={!video}
          active={true}
          title={{ width: '150px' }}
          paragraph={{ rows: 5 }}
          avatar={{ shape: 'square', size: 'large' }}
        >
          <RenderVideoDetails video={video} />
        </Skeleton>
      </section>
    );
  }
}
