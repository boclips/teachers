import { Button, Icon } from 'antd';
import queryString from 'query-string';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import CopyLinkSVG from '../../../../../resources/images/copy-link.svg';
import { Constants } from '../../../../app/AppConstants';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { UserState } from '../../../../types/State';
import { Segment, Video } from '../../../../types/Video';
import NotificationFactory from '../../../common/NotificationFactory';

interface OwnProps {
  video: Video;
  segment?: Segment;
}

interface StateProps {
  userId: string | null;
}

class CopyLinkButton extends React.PureComponent<OwnProps & StateProps> {
  private showCopiedNotification = () => {
    AnalyticsFactory.getInstance().trackVideoLinkCopied(
      this.props.video,
      this.props.segment,
    );
    NotificationFactory.success({
      message: 'Copied!',
      description: 'The video link has been copied to your clipboard.',
    });
  };

  public render() {
    return (
      <CopyToClipboard
        text={this.getLink()}
        onCopy={this.showCopiedNotification}
        options={{ debug: true }}
      >
        <Button data-qa="copy-link" tabIndex={0}>
          <Icon component={CopyLinkSVG} /> Copy link
        </Button>
      </CopyToClipboard>
    );
  }

  private getLink() {
    const url = `${Constants.HOST}/videos/${this.props.video.id}`;

    const params = queryString.stringify({
      referer: this.props.userId || undefined,
      segmentStart: this.props.segment && this.props.segment.start,
      segmentEnd: this.props.segment && this.props.segment.end,
    });

    return `${url}?${params}`;
  }
}

function mapStateToProps(state: UserState): StateProps {
  return {
    userId: state.user ? state.user.id : null,
  };
}

export default connect(mapStateToProps)(CopyLinkButton);
