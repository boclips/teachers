import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import querystring from 'query-string';
import { replace } from 'connected-react-router';
import { useLocation } from 'react-router';
import { isAuthenticated } from 'src/app/redux/authentication/selectors';
import { ShareCodeDialog } from 'src/components/common/share/ShareCodeDialog/ShareCodeDialog';
import { DetailsNotFound } from 'src/components/common/DetailsNotFound';
import { checkShareCode } from 'src/services/shareCodes/checkShareCode';
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

const VideoDetailsView = ({ videoId }: Props) => {
  useRefererIdInjector();
  const dispatch = useDispatch();
  const location = useLocation();

  const authenticated = useSelector(isAuthenticated);
  const shareCode = useSelector(
    (state: State) => state.authentication.shareCode,
  );
  const userId = useSelector((state: State) => state.user && state.user.id);
  const video = useSelector((state: State) => getVideoById(state, videoId));
  const isVideoLoading = useSelector((state: State) => isLoading(state));
  const [canAccess, setCanAccess] = useState(authenticated);

  const params = querystring.parse(location.search);
  const referer = params.referer as string;

  useEffect(() => {
    if (shareCode && referer) {
      checkShareCode(referer, shareCode).then(() => setCanAccess(true));
    }
  }, [referer, shareCode]);

  useEffect(() => {
    dispatch(fetchVideoAction({ id: videoId }));
  }, [dispatch, videoId]);

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
