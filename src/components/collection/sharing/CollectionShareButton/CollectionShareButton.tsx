import * as React from 'react';
import { useSelector } from 'react-redux';
import { useMediaBreakPoint } from 'src/hooks/useMediaBreakPoint';
import { VideoCollection } from 'src/types/VideoCollection';
import { getShareableCollectionLink } from 'src/services/links/getShareableCollectionLink';
import { CopyLinkButton } from 'src/components/video/buttons/copyLink/CopyLinkButton';
import { GoogleClassroomShareButton } from 'src/components/video/buttons/gclassroom/GoogleClassroomShareButton';
import { ShareButton } from 'src/components/common/share/ShareButton/ShareButton';
import State from '../../../../types/State';
import MediaBreakpoints from '../../../../types/MediaBreakpoints';

interface Props {
  collection: VideoCollection;
}

export const CollectionShareButton = React.memo<Props>(
  ({ collection }: Props) => {
    const user = useSelector((state: State) => state.user);
    const width = useMediaBreakPoint();

    if (!collection || !user) {
      return null;
    }

    const mobileView = width.width <= MediaBreakpoints.md.width;

    const shareLink = getShareableCollectionLink(collection.id, user.id);

    return (
      <ShareButton
        title={`Share ${mobileView ? 'collection' : collection.title}`}
        shareCode={user.shareCode}
      >
        <div className="share-buttons">
          <CopyLinkButton link={shareLink} onClick={() => {}} />
          <GoogleClassroomShareButton
            link={shareLink}
            postTitle={collection.title}
            postBody={`Use code ${user.shareCode} to view this.`}
            onClick={() => {}}
          />
        </div>
      </ShareButton>
    );
  },
);
