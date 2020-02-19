import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaBreakPoint } from '../../../../hooks/useMediaBreakPoint';
import MediaBreakpoints from '../../../../types/MediaBreakpoints';
import State from '../../../../types/State';
import { Segment, Video } from '../../../../types/Video';
import Bodal from '../../../common/Bodal';
import CopyLinkButton from '../../buttons/copyLink/CopyLinkButton';
import { GoogleClassroomShareButton } from '../../buttons/gclassroom/GoogleClassroomShareButton';
import { ShareForm } from '../ShareForm';
import './VideoShareModal.less';

interface Props {
  video: Video;
  handleClose: () => void;
  visible: boolean;
}

export const VideoShareModal = React.memo<Props>(props => {
  const [segment, setSegment] = useState<Segment>(null);
  const user = useSelector((state: State) => state.user);
  const width = useMediaBreakPoint();
  const mobileView = width.width <= MediaBreakpoints.md.width;

  return (
    <Bodal
      title={`Share ${mobileView ? 'video' : props.video.title}`}
      visible={props.visible}
      onCancel={props.handleClose}
      footer={
        <section className="share-code">
          <p className="share-code__explainer">
            Share this code with the link for access:
          </p>
          <span className="share-code__code">{user.shareCode}</span>
        </section>
      }
      wrapClassName="share-modal"
    >
      <ShareForm video={props.video} onSegmentChange={setSegment} />
      <div className="share-buttons">
        <CopyLinkButton
          video={props.video}
          userId={user.id}
          segment={segment}
        />
        <GoogleClassroomShareButton
          video={props.video}
          userId={user.id}
          shareCode={user.shareCode}
          segment={segment}
        />
      </div>
    </Bodal>
  );
});
