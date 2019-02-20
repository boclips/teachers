import { Button } from 'antd';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Constants } from '../../../app/AppConstants';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { Video } from '../../../types/Video';
import NotificationFactory from '../../common/NotificationFactory';

interface OwnProps {
  video: Video;
}

export class CopyLinkButton extends React.PureComponent<OwnProps> {
  private showCopiedNotification = (video: Video) => (url: string) => {
    AnalyticsFactory.getInstance().trackVideoLinkCopied(video);
    NotificationFactory.success({
      message: url,
      description:
        'has been copied to your clipboard. Paste link to your tool of choice.',
    });
  };

  public render() {
    return (
      <CopyToClipboard
        text={`${Constants.HOST}/videos/${this.props.video.id}`}
        onCopy={this.showCopiedNotification(this.props.video)}
        options={{ debug: true }}
      >
        <Button
          data-qa="copy-link"
          size={'large'}
          className={'secondary copy-link-button'}
          tabIndex={0}
        >
          Copy link
        </Button>
      </CopyToClipboard>
    );
  }
}
