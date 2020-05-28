import React from 'react';
import { Col, Row } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import EmptyCollectionImage from 'resources/images/empty-collection.svg';
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
    if (totalVideoCount === 0) {
      return (
        <Row className={'empty-collection'}>
          <EmptyCollectionImage />
        </Row>
      );
    }

    const gridSize = 4;
    const previewImages = this.props.videos.slice(0, gridSize).map((video) => (
      <LazyLoadImage
        className="thumbnail-container"
        data-qa="thumbnail"
        key={video.id}
        height="100%"
        width="100%"
        style={{
          background: `url(${video.thumbnailUrl}) center center`,
          backgroundSize: 'cover',
        }}
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
            className="thumbnail-container thumbnail-container--placeholder"
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
