import { Button, Row } from 'antd';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import tickIcon from '../../../../resources/images/green-check.png';
import { Constants } from '../../../app/AppConstants';
import AppConfig from '../../../app/AppConfig';
import { actionCreatorFactory } from '../../../app/redux/actions';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { Video } from '../../../types/Video';
import NotificationFactory from '../../common/NotificationFactory';
import VideoPreviewDefaultCollectionButton from './VideoDefaultCollectionButton';

export const addToDefaultCollectionAction = actionCreatorFactory<Video>(
  'ADD_TO_DEFAULT_COLLECTION',
);

export const removeFromDefaultCollectionAction = actionCreatorFactory<Video>(
  'REMOVE_FROM_DEFAULT_COLLECTION',
);

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
