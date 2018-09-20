import { Skeleton } from 'antd';
import React from 'react';
import { Video } from '../Video';
import VideoPreview from "../components/VideoPreview";

interface Props {
  video: Video | null;
}

function RenderVideoDetails({ video }: Props) {
  if (!video) {
    return null;
  }

  return (
    <section>
      <VideoPreview video={video} />
    </section>
  );
}

export default class VideoDetails extends React.PureComponent<Props> {
  public render() {
    const { video } = this.props;
    return (
      <Skeleton loading={!video}>
        <RenderVideoDetails video={video} />
      </Skeleton>
    );
  }
}
