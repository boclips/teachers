import * as React from 'react';
import { useSelector } from 'react-redux';
import { useMediaBreakPoint } from 'src/hooks/useMediaBreakPoint';
import State from '../../../../types/State';
import Bodal from '../../../common/Bodal';
import './CollectionShareModal.less';
import { VideoCollection } from 'src/types/VideoCollection';
import { getShareableCollectionLink } from 'src/services/links/getShareableCollectionLink';
import { CopyLinkButton } from 'src/components/video/buttons/copyLink/CopyLinkButton';
import { GoogleClassroomShareButton } from 'src/components/video/buttons/gclassroom/GoogleClassroomShareButton';
import MediaBreakpoints from '../../../../types/MediaBreakpoints';

interface Props {
  collection: VideoCollection;
  handleClose: () => void;
  visible: boolean;
}

export const CollectionShareModal = React.memo<Props>(props => {
  const user = useSelector((state: State) => state.user);
  const width = useMediaBreakPoint();
  const mobileView = width.width <= MediaBreakpoints.md.width;

  const shareLink = getShareableCollectionLink(props.collection.id, user.id);

  const handleCopyLink = () => {
    // TODO(AO): Is this necessary?
    // AnalyticsFactory.internalAnalytics()
    //   .trackCollectionLinkCopied(props.collection)
    //   .catch(console.error);
  };
  const handleGoogleShare = () => {
    // TODO(AO): Is this necessary?
    // AnalyticsFactory.internalAnalytics()
    //   .trackCollectionSharedInGoogle(props.collection)
    //   .catch(console.error);
  };

  return (
    <Bodal
      title={`Share ${mobileView ? 'collection' : props.collection.title}`}
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
      <div className="share-buttons">
        <CopyLinkButton link={shareLink} onClick={handleCopyLink} />
        <GoogleClassroomShareButton
          link={shareLink}
          postTitle={props.collection.title}
          // postBody={`Use code ${this.props.shareCode} to view this.`}
          onClick={handleGoogleShare}
        />
      </div>
    </Bodal>
  );
});
