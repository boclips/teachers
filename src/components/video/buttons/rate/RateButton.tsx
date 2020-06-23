import Icon from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import RateIcon from '../../../../../resources/images/rate.svg';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { Video } from '../../../../types/Video';
import VideoFeedbackModal from '../../rating/VideoFeedbackModal';

export interface RatingProps {
  video: Video;
}

interface State {
  visible: boolean;
}

export default class RateButton extends React.Component<RatingProps, State> {
  public constructor(props: RatingProps) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  public render() {
    if (!this.props.video.links.rate) {
      return null;
    }

    return (
      <React.Fragment>
        <VideoFeedbackModal
          visible={this.state.visible}
          video={this.props.video}
          onSaved={this.closeModal}
          onModalCancelled={this.closeModal}
        />
        <Button
          data-qa="rating-video-button"
          onClick={this.openModal}
          tabIndex={0}
        >
          <Icon component={RateIcon} /> Rate this video
        </Button>
      </React.Fragment>
    );
  }

  private openModal = () => {
    this.setState({ visible: true });
    AnalyticsFactory.externalAnalytics().trackVideoRatingModalOpened();
    AnalyticsFactory.internalAnalytics().trackRateThisVideoLinkClicked(
      this.props.video,
    );
  };

  private closeModal = () => {
    this.setState({ visible: false });
  };
}
