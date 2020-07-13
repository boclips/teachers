import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import querystring from 'query-string';
import { replace } from 'connected-react-router';
import { useLocation } from 'react-router';
import { isAuthenticated } from 'src/app/redux/authentication/selectors';
import { ShareCodeDialog } from 'src/components/common/share/ShareCodeDialog/ShareCodeDialog';
import { DetailsNotFound } from 'src/components/common/DetailsNotFound';
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
  const userId = useSelector((state: State) => state.user && state.user.id);
  const video = useSelector((state: State) => getVideoById(state, videoId));
  const isVideoLoading = useSelector((state: State) => isLoading(state));

  const params = querystring.parse(location.search);
  const checkShareCode =
    !authenticated &&
    params.share &&
    params.referer &&
    params.referer !== 'anonymous';

  useEffect(() => {
    dispatch(fetchVideoAction(videoId));
  }, [dispatch, videoId]);

  useEffect(() => {
    if ((userId || !params.referer) && userId !== params.referer) {
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
  }, [dispatch, params, videoId, userId]);

  if (!video && !isVideoLoading) {
    return (
      <DetailsNotFound
        title="Oops!!"
        message="The video you tried to access is not available."
        dataQa="video-not-found"
      />
    );
  }

  return (
    <PageLayout title={video?.title} showNavigation showFooter showSearchBar>
      <section data-qa="video-details-page">
        <section className="video-details-page" data-qa="video-details">
          <VideoDetails video={video} />
        </section>
      </section>
      {checkShareCode && (
        <ShareCodeDialog title="Enter code to watch video" cta="Watch video" />
      )}
    </PageLayout>
  );
};

export default VideoDetailsView;
