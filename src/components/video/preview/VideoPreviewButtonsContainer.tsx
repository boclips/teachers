import { Button, notification, Row } from 'antd';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import tickIcon from '../../../../resources/images/green-check.png';
import AppConfig from '../../../app/AppConfig';
import { Video } from '../../../types/Video';

interface Props {
  isInCollection: boolean;
  onToggleInDefaultCollection: (inDefaultCollection: boolean) => void;
  video: Video;
}
export class VideoPreviewButtonsContainer extends React.PureComponent<Props> {
  private showCopiedNotification = (url: string) => {
    notification.success({
      message: url,
      description: (
        <div role="alert">
          `has been copied to your clipboard. Paste link to your tool of
          choice.`
        </div>
      ),
      placement: 'bottomRight',
      icon: <img src={tickIcon} />,
      style: {
        background: '#008F52',
        color: '#FFFFFF',
      },
      duration: 6,
    });
  };

  private toggleInDefaultCollection = () => {
    this.props.onToggleInDefaultCollection(!this.props.isInCollection);
  };

  public render() {
    return (
      <Row className="buttons-row">
        <CopyToClipboard
          text={`${AppConfig.getHost()}/videos/${this.props.video.id}`}
          onCopy={this.showCopiedNotification}
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
        <Button
          className="toggle-collection-button"
          data-qa="default-collection-toggle"
          onClick={this.toggleInDefaultCollection}
          size={'large'}
        >
          {this.props.isInCollection ? 'Saved' : 'Save'}
        </Button>
      </Row>
    );
  }
}
