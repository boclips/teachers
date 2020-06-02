import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Replay from '../../../../resources/images/replay_white.svg';
import Share from '../../../../resources/images/share_white.svg';
import Save from '../../../../resources/images/save_white.svg';
import { VideoShareButton } from '../sharing/VideoShareButton/VideoShareButton';
import ManageVideoCollectionButton from '../buttons/videoCollection/ManageVideoCollectionButton';
import { EndOverlayRatingStars } from './EndOverlayRatingStars';

export interface Props {
  visible: boolean;
  getOverlayContainer: HTMLElement;
  shareCode: string;
  collectionKey: string;
  video: any;
  replayOnClick: any;
  superImposedContainer: HTMLElement;
}

export const EndOfVideoOverlay = (props: Props) => {
  const [container, setContainer] = useState(null);
  const [visible, setVisible] = useState(false);
  const [superImposedContainer, setSuperImposedContainer] = useState(null);

  useEffect(() => {
    setSuperImposedContainer(props.superImposedContainer);
    setContainer(props.getOverlayContainer);
    setVisible(props.visible);
  }, [props.getOverlayContainer, props.visible, props.superImposedContainer]);

  const child = () => (
    <div className={'end-video-overlay-container'}>
      {!props.video.rating ? (
        <EndOverlayRatingStars video={props.video} />
      ) : (
        <button
          className={'video-overlay-replay-button'}
          onClick={() => props.replayOnClick()}
        >
          Watch Again
        </button>
      )}
      <div className={'overlay-buttons-container'}>
        {!props.video.rating && (
          <span className={'overlay-buttons-children'}>
            <button
              className={'video-overlay-buttons'}
              onClick={() => props.replayOnClick()}
            >
              <Replay className={'overlay-buttons-icon'} />
              <div className={'overlay-buttons-text'}>Replay</div>
            </button>
          </span>
        )}
        <span className={'overlay-buttons-children'}>
          <ManageVideoCollectionButton
            video={props.video}
            icon={Save}
            collectionKey={'myCollections'}
            getPopupContainer={() => superImposedContainer}
          ></ManageVideoCollectionButton>
        </span>
        <span className={'overlay-buttons-children'}>
          <VideoShareButton
            video={props.video}
            getContainer={superImposedContainer}
            icon={Share}
          ></VideoShareButton>
        </span>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      {visible && ReactDOM.createPortal(child(), container)}
    </React.Fragment>
  );
};
