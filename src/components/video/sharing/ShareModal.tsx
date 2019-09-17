import * as React from 'react';
import { connect } from 'react-redux';
import { UserState } from '../../../types/State';
import { Segment, Video } from '../../../types/Video';
import Bodal from '../../common/Bodal';
import CopyLinkButton from '../buttons/copyLink/CopyLinkButton';
import { GoogleClassroomShareButton } from '../buttons/gclassroom/GoogleClassroomShareButton';
import { ShareForm } from './ShareForm';
import './ShareModal.less';

interface OwnProps {
  mobileView: boolean;
  video: Video;
  handleClose: () => void;
  visible: boolean;
}

interface Props {
  userId: string | null;
}

interface State {
  segment: Segment | null;
}

class ShareModal extends React.Component<Props & OwnProps, State> {
  public state = {
    segment: null,
  };

  private handleSegmentChange = (segment: Segment) => {
    this.setState({ segment });
  };

  public render() {
    return (
      <Bodal
        title={`Share ${
          this.props.mobileView ? 'video' : this.props.video.title
        }`}
        visible={this.props.visible}
        onCancel={this.props.handleClose}
        footer={
          <div>
            <CopyLinkButton
              video={this.props.video}
              userId={this.props.userId}
              segment={this.state.segment}
            />
            <GoogleClassroomShareButton
              video={this.props.video}
              userId={this.props.userId}
              segment={this.state.segment}
            />
          </div>
        }
        wrapClassName="share-modal"
      >
        <ShareForm
          video={this.props.video}
          onSegmentChange={this.handleSegmentChange}
        />
      </Bodal>
    );
  }
}

const mapStateToProps = (state: UserState): Props => {
  const userId = state.user ? state.user.id : null;
  return { userId };
};

export default connect(mapStateToProps)(ShareModal);
