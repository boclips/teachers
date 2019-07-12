import { Rate } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import rateVideo from '../../../services/videos/rateVideo';
import { Video } from '../../../types/Video';
import Bodal from '../../common/Bodal';
import { storeVideoAction } from '../redux/actions/storeVideoAction';
import { RatingProps } from './Rating';

const desc = ['Terrible', 'Poor', 'Satisfactory', 'Great', 'Outstanding'];

interface ModalProps extends RatingProps {
  visible: boolean;
  onRated: () => void;
  onRatingCancelled: () => void;
}

interface ModalState {
  rating: number;
}

interface DispatchProps {
  videoUpdated: (Video) => void;
}

class RatingModal extends React.Component<
  ModalProps & DispatchProps,
  ModalState
> {
  constructor(props: ModalProps & DispatchProps) {
    super(props);

    this.state = {
      rating: undefined,
    };
  }

  public render() {
    return this.props.video.links.rate ? (
      <Bodal
        title="Help us improve the information on this video"
        closable={false}
        visible={this.props.visible}
        onOk={this.rate}
        onCancel={this.props.onRatingCancelled}
        okButtonProps={{ size: 'large', 'data-qa': 'rate-button' }}
        cancelButtonProps={{ size: 'large' }}
        okText="Done"
        cancelText="Cancel"
      >
        <p data-qa="rating-description">
          We want to know what you think of our videos. What rating would you
          give "{this.props.video.title}".
        </p>
        <section data-qa="rate-video">
          <Rate
            className="rating--rate"
            tooltips={desc}
            onChange={this.changeRating}
          />
        </section>
      </Bodal>
    ) : null;
  }

  private changeRating = rating => this.setState({ rating });

  private rate = () => {
    rateVideo(this.props.video, this.state.rating)
      .then(video => this.props.videoUpdated(video))
      .then(() => this.props.onRated());
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    videoUpdated: (video: Video) => dispatch(storeVideoAction(video)),
  };
}

export default connect(
  undefined,
  mapDispatchToProps,
)(RatingModal);
