import React, { useEffect } from 'react';
import Rating from 'src/components/video/rating/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideosAction } from 'src/components/video/redux/actions/fetchVideosAction';
import VideoPlayer from 'src/components/video/player/VideoPlayer';
import VideoButtons from 'src/components/video/buttons/videoButtons/VideoButtons';
import { VideoCard } from '@bit/boclips._ui.video-card';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { Video } from 'src/types/Video';
import State from 'src/types/State';

export const Bit = (): any => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.entities.videos.byId);

  useEffect(() => {
    dispatch(
      fetchVideosAction({
        filters: {
          type: ['STOCK', 'INSTRUCTIONAL'],
          duration: null,
          age_range: null,
        },
        sortBy: null,
        query: 'math',
        page: 1,
      }),
    );
  }, []);

  const emitVideoLinkClickEvent = (video: Video) => {
    AnalyticsFactory.internalAnalytics().trackVideoLinkClicked(video);
  };

  const isAuthenticated = useSelector((state: State) => !!state.user);

  return (
    <div style={{ padding: '50px', marginTop: '100px', marginBottom: '100px' }}>
      {Object.keys(videos).map((it, i) => {
        const video = videos[it];
        return (
          <VideoCard
            video={video}
            rating={<Rating video={video} />}
            authenticated={isAuthenticated}
            videoPlayer={
              <VideoPlayer video={video} videoIndex={i} mode="card" />
            }
            videoActionButtons={<VideoButtons video={video} mode={'card'} />}
            analytics={() => emitVideoLinkClickEvent(video)}
            key={i}
          />
        );
      })}
    </div>
  );
};
