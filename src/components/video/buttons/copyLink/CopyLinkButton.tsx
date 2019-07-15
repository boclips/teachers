import { Button, Icon } from 'antd';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import CopyLinkSVG from '../../../../../resources/images/copy-link.svg';
import { Constants } from '../../../../app/AppConstants';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { LoginState } from '../../../../types/State';
import { Video } from '../../../../types/Video';
import NotificationFactory from '../../../common/NotificationFactory';

interface OwnProps {
  video: Video;
}

interface StateProps {
  userId: string | null;
}

class CopyLinkButton extends React.PureComponent<OwnProps & StateProps> {
  private showCopiedNotification = (video: Video) => () => {
    AnalyticsFactory.getInstance().trackVideoLinkCopied(video);
    NotificationFactory.success({
      message: 'Copied!',
      description: 'The video link has been copied to your clipboard.',
    });
  };

  public render() {
    return (
      <CopyToClipboard
        text={this.getLink()}
        onCopy={this.showCopiedNotification(this.props.video)}
        options={{ debug: true }}
      >
        <Button data-qa="copy-link" tabIndex={0}>
          <Icon component={CopyLinkSVG} /> Copy link
        </Button>
      </CopyToClipboard>
    );
  }

  private getLink() {
    const link = `${Constants.HOST}/videos/${this.props.video.id}`;
    if (this.props.userId) {
      return `${link}?referer=${this.props.userId}`;
    }
    return link;
  }
}

function mapStateToProps(state: LoginState): StateProps {
  return {
    userId: state.user ? state.user.id : null,
  };
}

export default connect(mapStateToProps)(CopyLinkButton);
