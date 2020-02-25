import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Segment, Video } from 'src/types/Video';
import '../../../common/share/ShareButton/ShareButton.less';
import { ShareForm } from 'src/components/video/sharing/ShareForm';
import { CopyLinkButton } from 'src/components/video/buttons/copyLink/CopyLinkButton';
import { GoogleClassroomShareButton } from 'src/components/video/buttons/gclassroom/GoogleClassroomShareButton';
import { useMediaBreakPoint } from 'src/hooks/useMediaBreakPoint';
import MediaBreakpoints from 'src/types/MediaBreakpoints';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { getShareableVideoLink } from 'src/services/links/getShareableVideoLink';
import { ShareButton } from 'src/components/common/share/ShareButton/ShareButton';
import State from '../../../../types/State';

interface Props {
  video: Video;
}

export const VideoShareButton = (props: Props) => {
  const isAuthenticated = useSelector((state: State) => !!state.user);
  const [segment, setSegment] = useState<Segment>(null);
  const user = useSelector((state: State) => state.user);
  const width = useMediaBreakPoint();
  const mobileView = width.width <= MediaBreakpoints.md.width;

  const handleCopyLink = () => {
    AnalyticsFactory.externalAnalytics().trackVideoLinkCopied(
      props.video,
      segment,
    );
    AnalyticsFactory.internalAnalytics()
      .trackVideoLinkCopied(props.video)
      .catch(console.error);
  };

  const handleGoogleShare = () => {
    AnalyticsFactory.externalAnalytics().trackVideoSharedInGoogle(
      props.video,
      segment,
    );
    AnalyticsFactory.internalAnalytics()
      .trackVideoSharedInGoogle(props.video)
      .catch(console.error);
  };

  if (isAuthenticated) {
    const shareLink = getShareableVideoLink(props.video.id, user.id, segment);

    return (
      isAuthenticated && (
        <ShareButton
          title={`Share ${mobileView ? 'video' : props.video.title}`}
          shareCode={user.shareCode}
        >
          <ShareForm video={props.video} onSegmentChange={setSegment} />
          <div className="share-buttons">
            <CopyLinkButton link={shareLink} onClick={handleCopyLink} />
            <GoogleClassroomShareButton
              link={shareLink}
              postTitle={props.video.title}
              postBody={`Use code ${user.shareCode} to view this.`}
              onClick={handleGoogleShare}
            />
          </div>
        </ShareButton>
      )
    );
  } else {
    return null
  }
};
