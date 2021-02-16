import { Rate, Tooltip } from 'antd';
import React from 'react';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { Video } from '../../../types/Video';
import './Rating.less';
import VideoFeedbackModal from './VideoFeedbackModal';

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

  public onKeyPress(e) {
    if (e.keyCode === 13) {
      this.openModal(e);
    }
  }

  private getRatingStars(video: Video) {
    const stars = (
      <span data-qa="rating-score" data-state={video.rating}>
        <Rate
          disabled
          defaultValue={video.rating}
          key={`rate-${video.id}-${video.rating}`}
        />
      </span>
    );

    if (video.links.rate) {
      return (
        <>
          <span className="rating--stars--non-editable mobile">{stars}</span>
          <span
            role="button"
            tabIndex={0}
            onKeyPress={this.onKeyPress}
            onClick={this.openModal}
            className="rating--rate-stars"
          >
            <Tooltip
              title="Help us improve the information on this video and give it a rating"
              data-qa="rating-video-stars"
            >
              {stars}
            </Tooltip>
          </span>
        </>
      );
    }
    return <span className="rating--stars--non-editable">{stars}</span>;
  }

  private openModal = (event: React.MouseEvent) => {
    event.preventDefault();

    this.setState({ visible: true });
    AnalyticsFactory.internalAnalytics().trackRateThisVideoLinkClicked(
      this.props.video,
    );
  };

  private closeModal = () => {
    this.setState({ visible: false });
  };

  public render() {
    const { video } = this.props;
    const { rating } = video;
    const { visible } = this.state;
    return (
      <>
        {rating !== null && rating !== undefined ? (
          this.getRatingStars(video)
        ) : video.links.rate ? (
          <span className="rating--container">
            <VideoFeedbackModal
              visible={visible}
              video={video}
              onSaved={this.closeModal}
              onModalCancelled={this.closeModal}
            />
            <>
              <button
                type="button"
                className="rating--rate-button"
                data-qa="rating-video-button"
                onClick={this.openModal}
                onKeyPress={this.onKeyPress}
              >
                Rate this video
              </button>
            </>
          </span>
        ) : null}
      </>
    );
  }
}
