import { Skeleton } from 'antd';
import React from 'react';
import { BoclipsPlayer } from '../../../boclips-react-player';
import DateFormatter from '../components/DateFormatter';
import DurationFormatter from '../components/DurationFormatter';
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
      <span data-qa="video-title">{video.title}</span>
      <span data-qa="video-description">{video.description}</span>
      <span data-qa="video-content-provider">{video.contentProvider}</span>
      <span data-qa="video-duration">
        <DurationFormatter duration={video.duration} />
      </span>
      <span data-qa="video-released-on">
        <DateFormatter date={video.releasedOn} />
      </span>
      <BoclipsPlayer thumbnail={video.thumbnailUrl} stream={video.streamUrl} />
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
