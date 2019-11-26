import React from 'react';
import { Col, Row } from 'antd';
import { Video } from '../../../types/Video';
import './CollectionCardSearchPreview.less';

interface Props {
  videos: Video[];
}

export class CollectionCardSearchPreview extends React.PureComponent<Props> {
  public render() {
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

    if (this.props.videos.length > gridSize) {
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
            {this.props.videos.length > gridSize && (
              <span className="video-counter">
                <span className="count">
                  +<span>{this.props.videos.length - (gridSize - 1)}</span>
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
}
