import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Icon from '@ant-design/icons';
import { ShareModal } from 'src/components/common/share/ShareModal';
import ManageVideCollectionMenuContainer from 'src/components/video/buttons/videoCollection/ManageVideoCollectionMenuContainer';
import { CollectionKey } from 'src/types/CollectionKey';
import { VideoShareButtonForm } from 'src/components/video/sharing/VideoShareButton/VideoShareButton';
import Save from '../../../../resources/images/save_white.svg';
import Replay from '../../../../resources/images/replay_white.svg';
import Share from '../../../../resources/images/share_white.svg';
import { EndOverlayRatingStars } from './EndOverlayRatingStars';

export interface Props {
  visible: boolean;
  getOverlayContainer: HTMLDivElement;
  shareCode: string;
  collectionKey: CollectionKey;
  video: any;
  replayOnClick: any;
  userIsAuthenticated: boolean;
}

export const EndOfVideoOverlay = (props: Props) => {
  const [container, setContainer] = useState<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [superImposedContainer, setSuperImposedContainer] = useState(
    document.body,
  );
  const [videoHasBeenRated, setVideoHasBeenRated] = useState(false);
  const [ratingsHidden, setRatingsHidden] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);

  useEffect(() => {
    setContainer(props.getOverlayContainer);
    setVisible(props.visible);
  }, [props.getOverlayContainer, props.visible]);

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      closeModalsOnFullScreen();
    });
    return document.removeEventListener('fullscreenchange', () => {
      closeModalsOnFullScreen();
    });
  });

  const checkIfFullScreen = () => {
    setSuperImposedContainer(
      document.fullscreenElement ||
        document.getElementsByClassName('plyr--fullscreen').length > 0
        ? props.getOverlayContainer
        : document.body,
    );
  };

  const closeModalsOnFullScreen = () => {
    if (!document.fullscreenElement) {
      checkIfFullScreen();
      setShareModalVisible(false);
      setSaveModalVisible(false);
    }
  };

  const child = () => (
    <div className="end-video-overlay-container">
      {!props.video.rating && !ratingsHidden && props.userIsAuthenticated ? (
        <EndOverlayRatingStars
          video={props.video}
          ratingUpdated={() => setVideoHasBeenRated(true)}
        />
      ) : (
        <button
          type="button"
          className="video-overlay-replay-button"
          onClick={() => props.replayOnClick()}
        >
          Replay
        </button>
      )}
      <div className="overlay-buttons-container">
        {!props.video.rating && !ratingsHidden && props.userIsAuthenticated && (
          <span className="overlay-buttons-children">
            <button
              type="button"
              className="video-overlay-buttons"
              onClick={() => {
                props.replayOnClick();
                if (videoHasBeenRated) {
                  setRatingsHidden(true);
                }
              }}
            >
              <Replay className="overlay-buttons-icon" />
              <div className="overlay-button-text">Replay</div>
            </button>
          </span>
        )}
        {props.userIsAuthenticated && (
          <>
            <ManageVideCollectionMenuContainer
              video={props.video}
              collectionKey={props.collectionKey}
              isMenuVisible={saveModalVisible}
              onVisibleChange={() => {
                checkIfFullScreen();
                setSaveModalVisible(!saveModalVisible);
              }}
              loading={false}
              getPopupContainer={() => superImposedContainer}
            >
              <button className="video-overlay-buttons" type="button">
                <Icon component={Save} className="overlay-button-icon" />
                <span className="overlay-button-text">Save</span>
              </button>
            </ManageVideCollectionMenuContainer>
            <span>
              <ShareModal
                title={props.video.title}
                shareCode={props.shareCode}
                visible={shareModalVisible}
                onCancel={() => {
                  setShareModalVisible(false);
                }}
                getContainer={superImposedContainer}
              >
                <VideoShareButtonForm video={props.video} />
              </ShareModal>
              <button
                type="button"
                className="video-overlay-buttons"
                onClick={() => {
                  checkIfFullScreen();
                  setShareModalVisible(true);
                }}
                data-qa="share-button"
              >
                <Icon component={Share} />
                <span className="overlay-button-text">Share</span>
              </button>
            </span>
          </>
        )}
      </div>
    </div>
  );

  return <>{visible && ReactDOM.createPortal(child(), container)}</>;
};
