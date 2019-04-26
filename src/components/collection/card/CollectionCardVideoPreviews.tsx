import React from 'react';
import { Video } from '../../../types/Video';
import CollectionCardPreviewCount from './CollectionCardPreviewCount';
import CollectionCardVideoPreview from './CollectionCardVideoPreview';
import './CollectionCardVideoPreviews.less';
import EmptyCollectionCardPreview from './EmptyCollectionCardPreview';

interface Props {
  videos: Video[];
  numberOfPreviews: number;
  id: string;
  isGrid: boolean;
}

class CollectionCardVideoPreviews extends React.PureComponent<Props> {
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
        <CollectionCardPreviewCount
          key={this.props.id + previews.length}
          totalNumberOfVideos={this.props.videos.length}
          numberOfPreviews={this.props.numberOfPreviews}
        />,
      );
    }

    while (previews.length < this.props.numberOfPreviews) {
      previews.push(
        <EmptyCollectionCardPreview key={this.props.id + previews.length} />,
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

export default CollectionCardVideoPreviews;
