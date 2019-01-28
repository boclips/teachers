import { Button, Row } from 'antd';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Constants } from '../../../app/AppConstants';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { Video } from '../../../types/Video';
import { addToDefaultCollectionAction } from '../../collection/redux/actions/addToDefaultCollectionAction';
import { removeFromDefaultCollectionAction } from '../../collection/redux/actions/removeFromDefaultCollectionAction';
import NotificationFactory from '../../common/NotificationFactory';
import VideoPreviewDefaultCollectionButton from './VideoDefaultCollectionButton';

interface OwnProps {
  isInCollection: boolean;
  video: Video;
  style: 'search' | 'collection';
}

interface DispatchProps {
  onAddToDefaultCollection: () => {};
  onRemoveFromDefaultCollection: () => {};
}

class VideoPreviewButtonsContainer extends React.PureComponent<
  OwnProps & DispatchProps
> {
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
      <Row className="buttons-row">
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
        <VideoPreviewDefaultCollectionButton
          isInDefaultCollection={this.props.isInCollection}
          style={this.props.style}
          onAddToDefaultCollection={this.props.onAddToDefaultCollection}
          onRemoveFromDefaultCollection={
            this.props.onRemoveFromDefaultCollection
          }
        />
      </Row>
    );
  }
}

function mapDispatchToProps(
  dispatch: Dispatch,
  props: OwnProps,
): DispatchProps {
  return {
    onAddToDefaultCollection: () =>
      dispatch(addToDefaultCollectionAction(props.video)),
    onRemoveFromDefaultCollection: () =>
      dispatch(removeFromDefaultCollectionAction(props.video)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(VideoPreviewButtonsContainer);
