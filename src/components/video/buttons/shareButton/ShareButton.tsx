import { Button, Icon } from 'antd';
import React from 'react';
import ShareSVG from '../../../../../resources/images/share.svg';
import { Video } from '../../../../types/Video';
import { ShareModal } from '../../sharing/ShareModal';
import './ShareButton.less';

interface Props {
  video: Video;
  mobileView: boolean;
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
        <Button onClick={this.handleOpen}>
          <Icon component={ShareSVG} />
          <span>Share</span>
        </Button>
        <ShareModal
          video={this.props.video}
          handleClose={this.handleClose}
          mobileView={this.props.mobileView}
          visible={this.state.visible}
        />
      </React.Fragment>
    );
  }
}

export default ShareButton;
