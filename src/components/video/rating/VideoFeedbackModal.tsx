import { Rate } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import tagVideo from '../../../services/tags/tagVideo';
import rateVideo from '../../../services/videos/rateVideo';
import { Tag } from '../../../types/Tag';
import { Video } from '../../../types/Video';
import Bodal from '../../common/Bodal';
import { storeVideoAction } from '../redux/actions/storeVideoAction';
import { RatingProps } from './Rating';
import TagVideo from './TagVideo';
import './VideoFeedbackModal.less';

const desc = ['Terrible', 'Poor', 'Satisfactory', 'Great', 'Outstanding'];

interface ModalProps extends RatingProps {
  visible: boolean;
  onSaved: () => void;
  onModalCancelled: () => void;
}

interface ModalState {
  rating: number;
  selectedTag?: Tag;
}

interface DispatchProps {
  videoUpdated: (Video) => void;
}

class VideoFeedbackModal extends React.Component<
  ModalProps & DispatchProps,
  ModalState
> {
  constructor(props: ModalProps & DispatchProps) {
    super(props);

    this.state = {
      rating: undefined,
      selectedTag: undefined,
    };
  }

  public render() {
    return this.props.video.links.rate ? (
      <Bodal
        title="Help us improve the information on this video"
        closable={false}
        visible={this.props.visible}
        onOk={this.save}
        onCancel={this.props.onModalCancelled}
        okButtonProps={{ size: 'large', 'data-qa': 'rate-button' }}
        cancelButtonProps={{ size: 'large' }}
        okText="Done"
        cancelText="Cancel"
        width={650}
      >
        <section
          className="video-feedback-modal--rating-container"
          data-qa="rate-video"
        >
          <h2 data-qa="rating-description">
            What rating would you give "{this.props.video.title}"?
          </h2>
          <Rate
            className="rating--rate"
            tooltips={desc}
            onChange={this.changeRating}
          />
        </section>

        <TagVideo
          onChange={this.changeSelectedTag}
          video={this.props.video}
          selectedTag={this.state.selectedTag}
        />
      </Bodal>
    ) : null;
  }

  private changeRating = rating => this.setState({ rating });
  private changeSelectedTag = selectedTag => this.setState({ selectedTag });

  private save = () => {
    Promise.resolve()
      .then(_ =>
        this.state.rating && this.props.video.links.rate
          ? rateVideo(this.props.video, this.state.rating)
          : this.props.video,
      )
      .then(video =>
        this.state.selectedTag && this.props.video.links.tag
          ? tagVideo(video, this.state.selectedTag)
          : video,
      )
      .then(video => this.props.videoUpdated(video))
      .then(() => this.props.onSaved());
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
)(VideoFeedbackModal);