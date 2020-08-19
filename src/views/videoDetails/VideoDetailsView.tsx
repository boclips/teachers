import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import querystring from 'query-string';
import { replace } from 'connected-react-router';
import { useLocation } from 'react-router';
import { isAuthenticated } from 'src/app/redux/authentication/selectors';
import { ShareCodeDialog } from 'src/components/common/share/ShareCodeDialog/ShareCodeDialog';
import { DetailsNotFound } from 'src/components/common/DetailsNotFound';
import { isUserActive } from 'src/services/users/isUserActive';
import { InactiveRefererModal } from 'src/components/video/details/InactiveRefererModal';
import { LoadingComponent } from 'src/components/common/LoadingComponent';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { PlatformInteractionType } from 'src/services/analytics/boclips/PlatformInteractionType';
import PageLayout from '../../components/layout/PageLayout';
import VideoDetails from '../../components/video/details/VideoDetails';
import {
  getVideoById,
  isLoading,
} from '../../components/video/redux/reducers/videoReducer';
import State from '../../types/State';
import { fetchVideoAction } from '../../components/video/redux/actions/fetchVideoAction';
import { useRefererIdInjector } from '../../hooks/useRefererIdInjector';

interface Props {
  videoId: string;
}
const sendPlatformInteractionEvent = AnalyticsFactory.internalAnalytics()
  .trackPlatformInteraction;
const { REFERER_INACTIVE } = PlatformInteractionType;

const VideoDetailsView = ({ videoId }: Props) => {
  useRefererIdInjector();
  const dispatch = useDispatch();
  const location = useLocation();

  const authenticated = useSelector(isAuthenticated);
  const { shareCode, refererId: validReferer } = useSelector(
    (state: State) => state.authentication,
  );

  const userId = useSelector((state: State) => state.user && state.user.id);
  const video = useSelector((state: State) => getVideoById(state, videoId));
  const isVideoLoading = useSelector((state: State) => isLoading(state));
  const [canAccess, setCanAccess] = useState(authenticated);
  const [refererIsActive, setRefererIsActive] = useState<boolean | null>(null);

  const params = querystring.parse(location.search);
  const referer = params.referer as string;
  const isValidShareCode = shareCode && referer === validReferer;

  useEffect(() => {
    setCanAccess(authenticated || isValidShareCode);
  }, [isValidShareCode, authenticated]);

  useEffect(() => {
    const fetchVideo = authenticated
      ? fetchVideoAction({ id: videoId })
      : fetchVideoAction({
          id: videoId,
          referer,
          shareCode,
        });

    dispatch(fetchVideo);
  }, [dispatch, videoId, referer, shareCode, authenticated]);

  useEffect(() => {
    if (!authenticated) {
      isUserActive(referer).then((isActive) => {
        setRefererIsActive(isActive);
        if (!isActive) {
          sendPlatformInteractionEvent(REFERER_INACTIVE, true);
        }
      });
    }
  }, [referer, authenticated]);

  useEffect(() => {
    if ((userId || !referer) && userId !== referer) {
      dispatch(
        replace({
          pathname: `/videos/${videoId}`,
          search: querystring.stringify({
            ...params,
            referer: userId || 'anonymous',
          }),
        }),
      );
    }
  }, [dispatch, params, videoId, userId, referer]);

  useEffect(() => {
    if (video && video.id !== videoId) {
      dispatch(
        replace({
          pathname: `/videos/${video.id}`,
        }),
      );
    }
  }, [dispatch, video, videoId]);

  if (!video && !isVideoLoading) {
    return (
      <PageLayout showNavigation showFooter showSearchBar>
        <DetailsNotFound
          title="Oops!!"
          message="The video you tried to access is not available."
          dataQa="video-not-found"
        />
      </PageLayout>
    );
  }

  if (!authenticated && !refererIsActive) {
    return (
      <PageLayout showNavigation showFooter showSearchBar>
        {refererIsActive === false ? (
          <InactiveRefererModal resourceType="video" />
        ) : (
          <LoadingComponent />
        )}
      </PageLayout>
    );
  }

  return (
    <PageLayout title={video?.title} showNavigation showFooter showSearchBar>
      <section data-qa="video-details-page">
        <section className="video-details-page" data-qa="video-details">
          <VideoDetails video={video} showOnlyThumbnail={!canAccess} />
        </section>
      </section>
      {!canAccess && (
        <ShareCodeDialog title="Enter code to watch video" cta="Watch video" />
      )}
    </PageLayout>
  );
};

export default VideoDetailsView;
