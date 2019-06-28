import { Icon } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import MediaBreakpoints from '../../../../types/MediaBreakpoints';
import { Video } from '../../../../types/Video';
import DurationFormatter from '../../../common/formatters/DurationFormatter';
import withMediaBreakPoint, {
  WithMediaBreakPointProps,
} from '../../../common/higerOrderComponents/withMediaBreakPoint';
import StopClickPropagation from '../../../common/StopClickPropagation';
import VideoPlayer from '../../../video/player/VideoPlayer';
import './CollectionCardVideoPreview.less';

interface Props extends WithMediaBreakPointProps {
  video: Video;
  isGrid: boolean;
  id: string;
}

class CollectionCardVideoPreview extends React.PureComponent<Props> {
  private renderThumbnailContainer() {
    return (
      <section className="colleciton-card-video-container">
        <section className="colleciton-card-video-container__inner">
          <section
            className="collection-card-thumbnail-container"
            style={{ backgroundImage: `url(${this.props.video.thumbnailUrl})` }}
          />
        </section>
      </section>
    );
  }

  private renderVideoContainer() {
    return (
      <section className="colleciton-card-video-container">
        <section className="colleciton-card-video-container__inner">
          <VideoPlayer video={this.props.video} mode="card" />
        </section>
      </section>
    );
  }

  public static VideoPreviewSkeleton = () => (
    <section className="collection-video-preview skeleton">
      <section className="colleciton-card-video-container" />
      <section className={'title'} />
      <section className={'subtitle'} />
    </section>
  );

  public render() {
    const video = this.props.video;
    return video ? (
      <StopClickPropagation key={`video-${video.id}`}>
        <section
          className="collection-video-preview"
          data-qa="collection-video-preview"
        >
          {this.props.isGrid ||
          this.props.mediaBreakpoint.width <= MediaBreakpoints.sm.width
            ? this.renderThumbnailContainer()
            : this.renderVideoContainer()}
          <Link
            to={`/videos/${video.id}`}
            className="title clamp-2-lines link--secondary"
          >
            {video.title}
          </Link>
          <section data-qa="video-duration" className={'subtitle duration'}>
            <Icon type="clock-circle" />{' '}
            <DurationFormatter duration={video.duration} />
          </section>
        </section>
      </StopClickPropagation>
    ) : (
      <CollectionCardVideoPreview.VideoPreviewSkeleton />
    );
  }
}

export default withMediaBreakPoint(CollectionCardVideoPreview);
