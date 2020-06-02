import { Rate } from 'antd';
import React from 'react';
import './EndOverlayRatingStars.less';
import rateVideo from 'src/services/videos/rateVideo';

export interface OverlayRatingStars {
  video: any;
}

export const EndOverlayRatingStars = (props: OverlayRatingStars) => {
  const save = (value) => {
    rateVideo(props.video, value);
  };

  return (
    <React.Fragment>
      <div className={'overlay-buttons-ratingtext'}>
        What did you think of this video?
      </div>
      <span data-qa="rating-score" data-state={props.video.rating}>
        <Rate
          disabled={false}
          key={`rate-${props.video.id}-${props.video.rating}`}
          onChange={(value) => {
            save(value);
          }}
          allowClear={true}
        />
      </span>
    </React.Fragment>
  );
};
