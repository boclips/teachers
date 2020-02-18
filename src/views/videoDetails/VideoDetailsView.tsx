import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import querystring from 'query-string';
import { replace } from 'connected-react-router';
import { useLocation } from 'react-router';
import { getVideoById } from 'src/components/video/redux/reducers/videoReducer';
import State from 'src/types/State';
import { ShareCodeDialog } from 'src/components/video/ShareCodeDialog/ShareCodeDialog';
import { fetchVideoAction } from 'src/components/video/redux/actions/fetchVideoAction';
import { useRefererIdInjector } from 'src/hooks/useRefererIdInjector';
import VideoDetails from '../../components/video/details/VideoDetails';
import PageLayout from '../../components/layout/PageLayout';

interface Props {
  videoId: string;
}

export const VideoDetailsView = (props: Props) => {
  useRefererIdInjector();
  const dispatch = useDispatch();
  const location = useLocation();

  const authenticated = useSelector(
    (state: State) => state.authentication.status === 'authenticated',
  );
  const userId = useSelector((state: State) => state.user && state.user.id);
  const video = useSelector((state: State) =>
    getVideoById(state, props.videoId),
  );

  const params = querystring.parse(location.search);
  const checkShareCode =
    !authenticated &&
    !!params.share &&
    !!params.referer &&
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
  }, [dispatch, params, params.referer, props.videoId, userId]);

  return (
    <PageLayout
      title={video && video.title}
      showNavigation={true}
      showFooter={true}
      showSearchBar={true}
    >
      <section data-qa="video-details-page">
        <section className="video-details-page" data-qa="video-details">
          <VideoDetails video={video} />
        </section>
      </section>
      {checkShareCode && <ShareCodeDialog userId={params.referer as string} />}
    </PageLayout>
  );
};
