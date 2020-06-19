import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import querystring from 'query-string';
import { replace } from 'connected-react-router';
import { useLocation } from 'react-router';
import { isAuthenticated } from 'src/app/redux/authentication/selectors';
import { ShareCodeDialog } from 'src/components/common/share/ShareCodeDialog/ShareCodeDialog';
import PageLayout from '../../components/layout/PageLayout';
import VideoDetails from '../../components/video/details/VideoDetails';
import { getVideoById } from '../../components/video/redux/reducers/videoReducer';
import State from '../../types/State';
import { fetchVideoAction } from '../../components/video/redux/actions/fetchVideoAction';
import { useRefererIdInjector } from '../../hooks/useRefererIdInjector';

interface Props {
  videoId: string;
}

export const VideoDetailsView = (props: Props) => {
  useRefererIdInjector();
  const dispatch = useDispatch();
  const location = useLocation();

  const authenticated = useSelector(isAuthenticated);
  const userId = useSelector((state: State) => state.user && state.user.id);
  const video = useSelector((state: State) =>
    getVideoById(state, props.videoId),
  );

  const params = querystring.parse(location.search);
  const checkShareCode =
    !authenticated &&
    params.share &&
    params.referer &&
    params.referer !== 'anonymous';

  useEffect(() => {
    dispatch(fetchVideoAction(props.videoId));
  }, [dispatch, props.videoId]);

  useEffect(() => {
    if ((userId || !params.referer) && userId !== params.referer) {
      dispatch(
        replace({
          pathname: `/videos/${props.videoId}`,
          search: querystring.stringify({
            ...params,
            referer: userId || 'anonymous',
          }),
        }),
      );
    }
  }, [dispatch, params, props.videoId, userId]);

  return (
    <PageLayout
      title={video?.title}
      showNavigation={true}
      showFooter={true}
      showSearchBar={true}
    >
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
