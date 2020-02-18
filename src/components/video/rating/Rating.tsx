import { Rate, Tooltip } from 'antd';
import React from 'react';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { Video } from 'src/types/Video';
import VideoFeedbackModal from './VideoFeedbackModal';
import './Rating.less';

export interface RatingProps {
  video: Video;
}

interface State {
  visible: boolean;
}

export default class Rating extends React.Component<RatingProps, State> {
  public constructor(props: RatingProps) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  public render() {
    const rating = this.props.video.rating;

    return (
      <span className="rating--container">
        <VideoFeedbackModal
          visible={this.state.visible}
          video={this.props.video}
          onSaved={this.closeModal}
          onModalCancelled={this.closeModal}
        />

        {rating !== null && rating !== undefined ? (
          this.getRatingStars(this.props.video)
        ) : this.props.video.links.rate ? (
          <React.Fragment>
            <a
              className="rating--rate-button"
              data-qa="rating-video-button"
              href="#"
              onClick={this.openModal}
            >
              Rate this video
            </a>
          </React.Fragment>
        ) : null}
      </span>
    );
  }

  private getRatingStars(video: Video) {
    const stars = (
      <span data-qa="rating-score" data-state={video.rating}>
        <Rate
          disabled={true}
          defaultValue={video.rating}
          key={`rate-${video.id}-${video.rating}`}
        />
      </span>
    );
    if (video.links.rate) {
      return (
        <React.Fragment>
          <span className="rating--stars--non-editable mobile">{stars}</span>
          <span onClick={this.openModal} className="rating--rate-stars">
            <Tooltip
              title="Help us improve the information on this video and give it a rating"
              data-qa="rating-video-stars"
            >
              {stars}
            </Tooltip>
          </span>
        </React.Fragment>
      );
    }
    return <span className="rating--stars--non-editable">{stars}</span>;
  }

  private openModal = (event: React.MouseEvent) => {
    event.preventDefault();

    this.setState({ visible: true });
    AnalyticsFactory.externalAnalytics().trackVideoRatingModalOpened();
  };

  private closeModal = () => {
    this.setState({ visible: false });
  };
}
