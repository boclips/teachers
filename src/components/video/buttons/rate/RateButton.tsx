import { Button, Icon } from 'antd';
import React from 'react';
import RateIcon from '../../../../../resources/images/rate.svg';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { Video } from '../../../../types/Video';
import RatingModal from '../../rating/RatingModal';

export interface RatingProps {
  video: Video;
}

interface State {
  visible: boolean;
}

export default class RateButton extends React.Component<RatingProps, State> {
  constructor(props: RatingProps) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  public render() {
    return (
      <span className="rating--container">
        <RatingModal
          visible={this.state.visible}
          video={this.props.video}
          onRated={this.closeModal}
          onRatingCancelled={this.closeModal}
        />

        {this.props.video.links.rate ? (
          <React.Fragment>
            <Button
              data-qa="rating-video-button"
              onClick={this.openModal}
              className={
                'secondary video-menu-button video-menu-button--un-padded video-menu-button--wide'
              }
              tabIndex={0}
            >
              <Icon
                component={RateIcon}
                style={{ fontSize: '20px', margin: '0 3px' }}
              />{' '}
              Rate this video
            </Button>
          </React.Fragment>
        ) : null}
      </span>
    );
  }

  private openModal = () => {
    this.setState({ visible: true });
    AnalyticsFactory.getInstance().trackVideoRatingModalOpened();
  };

  private closeModal = () => {
    this.setState({ visible: false });
  };
}
