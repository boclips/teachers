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
  public constructor(props: ModalProps & DispatchProps) {
    super(props);

    this.state = {
      rating: undefined,
      selectedTag: undefined,
    };
  }

  private changeRating = (rating) => this.setState({ rating });

  private changeSelectedTag = (selectedTag) => this.setState({ selectedTag });

  private save = () => {
    Promise.resolve()
      .then(() =>
        this.state.rating && this.props.video.links.rate
          ? rateVideo(this.props.video, this.state.rating)
          : this.props.video,
      )
      .then((video) =>
        this.state.selectedTag && this.props.video.links.tag
          ? tagVideo(video, this.state.selectedTag)
          : video,
      )
      .then((video) => this.props.videoUpdated(video))
      .then(() => this.props.onSaved());
  };

  private alreadyRated() {
    try {
      const { video } = this.props;
      return desc[video.yourRating - 1] && true;
    } catch (e) {
      return false;
    }
  }

  public render() {
    const { onModalCancelled, video, visible } = this.props;
    const { selectedTag } = this.state;
    return video.links.rate ? (
      <Bodal
        title="Help us improve the information on this video"
        closable={false}
        visible={visible}
        onOk={this.save}
        onCancel={onModalCancelled}
        // @ts-ignore
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
            {this.alreadyRated()
              ? `You have already rated this video as "${
                  desc[video.yourRating - 1]
                }". If you would like to change this, select a new rating.`
              : `What rating would you give "${video.title}"?`}
          </h2>
          <Rate
            className="rating--rate"
            tooltips={desc}
            onChange={this.changeRating}
            defaultValue={video.yourRating}
          />
        </section>

        <TagVideo
          onChange={this.changeSelectedTag}
          video={video}
          selectedTag={selectedTag}
        />
      </Bodal>
    ) : null;
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    videoUpdated: (video: Video) =>
      dispatch(storeVideoAction({ originalId: video.id, video })),
  };
}

export default connect(undefined, mapDispatchToProps)(VideoFeedbackModal);
