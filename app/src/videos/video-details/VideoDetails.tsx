import { Skeleton } from 'antd';
import React from 'react';
import VideoPreview from '../components/VideoPreview';
import { Video } from '../Video';

interface Props {
  video: Video | null;
}

function RenderVideoDetails({ video }: Props) {
  if (!video) {
    return null;
  }

  return (
    <section>
      <VideoPreview video={video} searchId={null} />
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
          title={{ width: '300px' }}
          paragraph={{ rows: 5 }}
          avatar={{ shape: 'square', size: 'large' }}
        >
          <RenderVideoDetails video={video} />
        </Skeleton>
      </section>
    );
  }
}
