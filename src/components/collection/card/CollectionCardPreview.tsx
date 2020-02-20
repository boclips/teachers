import React from 'react';
import { Col, Row } from 'antd';
import { Video } from '../../../types/Video';
import './CollectionCardPreview.less';
import { VideoCollection } from '../../../types/VideoCollection';

interface Props {
  collection: VideoCollection;
  videos: Video[];
}

export class CollectionCardPreview extends React.PureComponent<Props> {
  public render() {
    const totalVideoCount = this.props.collection.videoIds.length;

    const gridSize = 4;
    const previewImages = this.props.videos
      .slice(0, gridSize)
      .map(video => (
        <div
          className="thumbnail-container"
          data-qa="thumbnail"
          style={{ backgroundImage: `url(${video.thumbnailUrl})` }}
          key={video.id}
        />
      ));

    if (totalVideoCount > gridSize) {
      previewImages.pop();
    }

    const placeholdersRequired = previewImages.length < gridSize;

    if (placeholdersRequired) {
      const numberOfThumbnailsRequired = gridSize - previewImages.length;
      for (let count = 0; count < numberOfThumbnailsRequired; ++count) {
        previewImages.push(
          <div
            key={count}
            className="thumbnail-container"
            data-qa="placeholder"
          >
            {count === numberOfThumbnailsRequired - 1 &&
              totalVideoCount > gridSize && (
                <span className="video-counter">
                  <span className="count">
                    +
                    <span data-qa="video-counter-count">
                      {totalVideoCount - (gridSize - 1)}
                    </span>
                  </span>
                  <span className="label">videos</span>
                </span>
              )}
          </div>,
        );
      }
    }

    return (
      <Row type="flex" gutter={[4, 4]}>
        {previewImages.map((image, index) => (
          <Col key={index} span={12}>
            {image}
          </Col>
        ))}
      </Row>
    );
  }

  public static Skeleton = () => (
    <Row
      type="flex"
      gutter={[4, 4]}
      className={'skeleton ant-skeleton ant-skeleton-active'}
    >
      <Col span={12}>
        <section className="thumbnail-container ant-skeleton-avatar ant-skeleton-avatar-lg" />
      </Col>
      <Col span={12}>
        <section className="thumbnail-container ant-skeleton-avatar ant-skeleton-avatar-lg" />
      </Col>
      <Col span={12}>
        <section className="thumbnail-container ant-skeleton-avatar ant-skeleton-avatar-lg" />
      </Col>
      <Col span={12}>
        <section className="thumbnail-container ant-skeleton-avatar ant-skeleton-avatar-lg" />
      </Col>
    </Row>
  );
}
