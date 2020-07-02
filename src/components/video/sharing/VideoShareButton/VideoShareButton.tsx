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

interface VideoShareButtonProps {
  video: Video;
  getContainer?: HTMLElement;
  icon?: React.ComponentType<any>;
}

interface VideoShareButtonForm {
  video: Video;
}

export const VideoShareButton = ({
  video,
  getContainer,
  icon,
}: VideoShareButtonProps) => {
  const isAuthenticated = useSelector((state: State) => !!state.user);

  const user = useSelector((state: State) => state.user);
  const width = useMediaBreakPoint();
  const mobileView = width.width <= MediaBreakpoints.md.width;

  if (isAuthenticated) {
    return (
      <ShareButton
        title={`Share ${mobileView ? 'video' : video.title}`}
        shareCode={user.shareCode}
        getContainer={getContainer}
        icon={icon}
      >
        <VideoShareButtonForm video={video} />
      </ShareButton>
    );
  }
  return null;
};

export const VideoShareButtonForm = ({ video }: VideoShareButtonForm) => {
  const [segment, setSegment] = useState<Segment>(null);
  const user = useSelector((state: State) => state.user);

  const shareLink = getShareableVideoLink(video.id, user.id, segment);

  const handleCopyLink = () => {
    AnalyticsFactory.externalAnalytics().trackVideoLinkCopied(video, segment);
    AnalyticsFactory.internalAnalytics()
      .trackVideoLinkCopied(video)
      .catch(console.error);
  };

  const handleGoogleShare = () => {
    AnalyticsFactory.externalAnalytics().trackVideoSharedInGoogle(
      video,
      segment,
    );
    AnalyticsFactory.internalAnalytics()
      .trackVideoSharedInGoogle(video)
      .catch(console.error);
  };

  return (
    <div>
      <ShareForm video={video} onSegmentChange={setSegment} />
      <div className="share-buttons">
        <CopyLinkButton link={shareLink} onClick={handleCopyLink} />
        <GoogleClassroomShareButton
          link={shareLink}
          postTitle={video.title}
          postBody={`Use code ${user.shareCode} to view this.`}
          onClick={handleGoogleShare}
        />
      </div>
    </div>
  );
};
