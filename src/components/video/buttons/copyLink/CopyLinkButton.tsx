import { Button, Icon } from 'antd';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyLinkSVG from '../../../../../resources/images/copy-link.svg';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { getShareableVideoLink } from '../../../../services/links/getShareableVideoLink';
import { Segment, Video } from '../../../../types/Video';
import NotificationFactory from '../../../common/NotificationFactory';

interface Props {
  video: Video;
  segment: Segment | null;
  userId: string | null;
}

export default class CopyLinkButton extends React.PureComponent<Props> {
  private onClick = () => {
    AnalyticsFactory.externalAnalytics().trackVideoLinkCopied(
      this.props.video,
      this.props.segment,
    );
    AnalyticsFactory.internalAnalytics()
      .trackVideoLinkCopied(this.props.video)
      .catch(console.error);
    NotificationFactory.success({
      message: 'Copied!',
      description: 'The video link has been copied to your clipboard.',
    });
  };

  public render() {
    const link = getShareableVideoLink(
      this.props.video.id,
      this.props.userId,
      this.props.segment,
    );

    return (
      <CopyToClipboard
        text={link}
        onCopy={this.onClick}
        options={{ debug: true }}
      >
        <Button data-qa="copy-link" data-link={link} tabIndex={0}>
          <Icon component={CopyLinkSVG} /> Copy link
        </Button>
      </CopyToClipboard>
    );
  }
}
