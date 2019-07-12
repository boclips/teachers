import { Rate, Tooltip } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import rateVideo from '../../../services/videos/rateVideo';
import { Video } from '../../../types/Video';
import Bodal from '../../common/Bodal';
import { storeVideoAction } from '../redux/actions/storeVideoAction';
import './Rating.less';

interface Props {
  video: Video;
}

interface DispatchProps {
  videoUpdated: (Video) => void;
}

interface State {
  visible: boolean;
  rating: number;
}

class Rating extends React.Component<Props & DispatchProps, State> {
  constructor(props: Props & DispatchProps) {
    super(props);

    this.state = {
      visible: false,
      rating: undefined,
    };
  }

  public render() {
    const desc = ['Terrible', 'Poor', 'Satisfactory', 'Great', 'Outstanding'];
    const rating = this.props.video.rating;

    return (
      <span className="rating--container">
        {this.props.video.links.rate && (
          <Bodal
            title="Help us improve the information on this video"
            closable={false}
            visible={this.state.visible}
            onOk={this.rate}
            onCancel={this.closeModal}
            okButtonProps={{ size: 'large', 'data-qa': 'rate-button' }}
            cancelButtonProps={{ size: 'large' }}
            okText="Done"
            cancelText="Cancel"
          >
            <p data-qa="rating-description">
              We want to know what you think of our videos. What rating would
              you give "{this.props.video.title}".
            </p>
            <section data-qa="rate-video">
              <Rate
                className="rating--rate"
                tooltips={desc}
                onChange={this.changeRating}
              />
            </section>
          </Bodal>
        )}

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
        <Rate disabled={true} defaultValue={video.rating} />
      </span>
    );
    if (video.links.rate) {
      return (
        <span onClick={this.openModal} className="rating--rate-stars">
          <Tooltip
            title="Help us improve the information on this video and give it a rating"
            data-qa="rating-video-stars"
          >
            {stars}
          </Tooltip>
        </span>
      );
    }
    return <span className="rating--stars--non-editable">{stars}</span>;
  }

  private changeRating = rating => this.setState({ rating });

  private rate = () => {
    rateVideo(this.props.video, this.state.rating)
      .then(video => this.props.videoUpdated(video))
      .then(() => this.closeModal());
  };

  private openModal = () => {
    this.setState({ visible: true });
    AnalyticsFactory.getInstance().trackVideoRatingModalOpened();
  };

  private closeModal = () => {
    this.setState({ visible: false });
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
)(Rating);
