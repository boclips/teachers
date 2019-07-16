import * as React from 'react';
import { Segment, Video } from '../../../types/Video';
import Bodal from '../../common/Bodal';
import CopyLinkButton from '../buttons/copyLink/CopyLinkButton';
import { GoogleClassroomShareButton } from '../buttons/gclassroom/GoogleClassroomShareButton';
import { ShareForm } from './ShareForm';
import './ShareModal.less';

interface Props {
  mobileView: boolean;
  video: Video;
  handleClose: () => void;
  visible: boolean;
}

interface State {
  segment: Segment;
}

export class ShareModal extends React.Component<Props, State> {
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
              segment={this.state.segment}
            />
            <GoogleClassroomShareButton
              video={this.props.video}
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
