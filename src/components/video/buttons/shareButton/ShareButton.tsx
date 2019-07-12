import { Button, Icon } from 'antd';
import classnames from 'classnames';
import React from 'react';
import ShareSVG from '../../../../../resources/images/share.svg';
import { Video } from '../../../../types/Video';
import Bodal from '../../../common/Bodal';
import CopyLinkButton from '../copyLink/CopyLinkButton';
import { GoogleClassroomShareButton } from '../gclassroom/GoogleClassroomShareButton';
import './ShareButton.less';

interface Props {
  video: Video;
  needsBorder: boolean;
}

interface State {
  visible: boolean;
}

class ShareButton extends React.Component<Props, State> {
  public state = {
    visible: false,
  };

  private handleClose = () => {
    this.setState({ visible: false });
  };
  private handleOpen = () => {
    this.setState({ visible: true });
  };

  public render() {
    return (
      <React.Fragment>
        <Button
          onClick={this.handleOpen}
          className={classnames('video-menu-button', {
            // TODO: This should be able to be replaced by smart CSS: .ant-btn-group > button + button
            'video-menu-button--bordered': this.props.needsBorder,
          })}
        >
          <section className="share-button">
            <Icon component={ShareSVG} className="share-button__icon" />
            <span>Share</span>
          </section>
        </Button>
        <Bodal
          title={`Share ${this.props.video.title}`}
          visible={this.state.visible}
          onCancel={this.handleClose}
          footer={
            <div>
              <CopyLinkButton video={this.props.video} />
              <GoogleClassroomShareButton video={this.props.video} />
            </div>
          }
          wrapClassName="share-modal"
        />
      </React.Fragment>
    );
  }
}

export default ShareButton;
