import React from 'react';
import MediaBreakpoints from '../../../types/MediaBreakpoints';
import { Video } from '../../../types/Video';
import withMediaBreakPoint, {
  WithMediaBreakPointProps,
} from '../../common/higerOrderComponents/withMediaBreakPoint';
import './CollectionCardVideoPreviews.less';
import CollectionCardVideoPreview from './preview/CollectionCardVideoPreview';
import CollectionCardVideoPreviewCount from './preview/CollectionCardVideoPreviewCount';
import EmptyCollectionCardVideoPreview from './preview/EmptyCollectionVideoCardPreview';

interface Props {
  videos: Video[];
  numberOfPreviews: number;
  id: string;
  isGrid: boolean;
}

class CollectionCardVideoPreviews extends React.PureComponent<
  Props & WithMediaBreakPointProps
> {
  public render() {
    const previews = [];
    if (this.props.videos.length === this.props.numberOfPreviews) {
      previews.push(
        ...this.props.videos
          .slice(0, this.props.numberOfPreviews)
          .map((video, index) => this.renderVideoPreview(video, index)),
      );
    } else {
      previews.push(
        ...this.props.videos
          .slice(0, this.props.numberOfPreviews - 1)
          .map((video, index) => this.renderVideoPreview(video, index)),
      );
    }
    if (this.props.videos.length > this.props.numberOfPreviews) {
      previews.push(
        <CollectionCardVideoPreviewCount
          key={this.props.id + previews.length}
          totalNumberOfVideos={this.props.videos.length}
          numberOfPreviews={this.props.numberOfPreviews}
        />,
      );
    }
    let emptyPreviewsLimit = this.props.numberOfPreviews;

    if (
      this.props.mediaBreakpoint.width <= MediaBreakpoints.md.width &&
      previews.length <= this.props.numberOfPreviews / 2
    ) {
      emptyPreviewsLimit /= 2;
    }
    while (previews.length < emptyPreviewsLimit) {
      previews.push(
        <EmptyCollectionCardVideoPreview
          key={this.props.id + previews.length}
        />,
      );
    }

    return (
      <section
        className="collection-video-previews"
        key={`collection-video-previews-${this.props.id}`}
      >
        {previews}
      </section>
    );
  }

  private renderVideoPreview(video: Video, key: number | string) {
    return (
      <CollectionCardVideoPreview
        video={video}
        isGrid={this.props.isGrid}
        id={this.props.id}
        key={`collection-video-preview-${this.props.id}-${key}`}
      />
    );
  }
}

export default withMediaBreakPoint(CollectionCardVideoPreviews);
