import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderLogoSVG from '../../../resources/images/recommendations-logo.svg';
import { SectionHeader } from '../../components/common/SectionHeader';
import VerticalVideoList from '../../components/video/list/VerticalVideoList';
import { fetchPromotedVideosAction } from '../../components/video/redux/actions/fetchPromotedVideosAction';
import { getPromotedVideoIds } from '../../components/video/redux/reducers/videoReducer';
import State from '../../types/State';
import './HomeViewVideoList.less';

export const PROMOTED_VIDEOS_SIZE = 3;

export const HomeViewVideoList = () => {
  const dispatch = useDispatch();
  const videoIds = useSelector((state: State) => getPromotedVideoIds(state));
  const userSubjects = useSelector((state: State) => state.user.subjects);

  useEffect(() => {
    if (!videoIds || videoIds.length === 0) {
      dispatch(
        fetchPromotedVideosAction({
          videoSearchRequest: {
            filters: {
              promoted: true,
              subject: userSubjects,
            },
            page: 1,
            size: 3,
            sortBy: 'RANDOM',
          },
          additionalVideos: false,
        }),
      );
    }
  }, [dispatch, videoIds, userSubjects]);

  return (
    videoIds &&
    videoIds.length > 0 && (
      <section data-qa="home-view-videos" className="home-view-video-list">
        <SectionHeader
          title="Videos for you"
          description="Watch a selection of some of our best videos"
          image={HeaderLogoSVG}
        />
        <VerticalVideoList videoIds={videoIds.slice(0, 3)} />
      </section>
    )
  );
};
