import React from 'react';

export interface Props {
  numberOfPreviews: number;
  totalNumberOfVideos: number;
}

const CollectionCardPreviewCount = React.memo((props: Props) => (
  <section className="video-container">
    <section className="video-container-inner">
      <section className="video-counter">
        <span className="count">
          +
          <span data-qa="collection-video-preview-counter">
            {props.totalNumberOfVideos - (props.numberOfPreviews - 1)}
          </span>
        </span>
        <section className="label">videos</section>
      </section>
    </section>
  </section>
));

export default CollectionCardPreviewCount;
