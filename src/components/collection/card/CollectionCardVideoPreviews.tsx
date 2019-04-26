import { uuid } from 'boclips-react-player/dist/src/uuid';
import React from 'react';
import { Video } from '../../../types/Video';
import CollectionCardVideoPreview from './CollectionCardVideoPreview';
import './CollectionCardVideoPreviews.less';

interface Props {
  videos: Video[];
  numberOfPreviews: number;
  id: string;
  isGrid: boolean;
}

class CollectionCardVideoPreviews extends React.PureComponent<Props> {
  private renderVideoPreviewCount(totalNumberOfVideos: number) {
    return (
      <section key={uuid()} className="video-container">
        <section className="video-container-inner">
          <section className="video-counter">
            <span className="count">
              +
              <span data-qa="collection-video-preview-counter">
                {totalNumberOfVideos - (this.props.numberOfPreviews - 1)}
              </span>
            </span>
            <section className="label">videos</section>
          </section>
        </section>
      </section>
    );
  }

  private renderVideoPreviewPadding() {
    return (
      <section key={uuid()} className="video-container video-container-padding">
        <section className="video-container-inner" />
      </section>
    );
  }

  public render() {
    const previews = [];
    if (this.props.videos.length === this.props.numberOfPreviews) {
      previews.push(
        ...this.props.videos
          .slice(0, this.props.numberOfPreviews)
          .map((video, index) =>
            this.renderVideoPreview(video, video ? video.id : index),
          ),
      );
    } else {
      previews.push(
        ...this.props.videos
          .slice(0, this.props.numberOfPreviews - 1)
          .map((video, index) =>
            this.renderVideoPreview(video, video ? video.id : index),
          ),
      );
    }
    if (this.props.videos.length > this.props.numberOfPreviews) {
      previews.push(this.renderVideoPreviewCount(this.props.videos.length));
    }

    while (previews.length < this.props.numberOfPreviews) {
      previews.push(this.renderVideoPreviewPadding());
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
