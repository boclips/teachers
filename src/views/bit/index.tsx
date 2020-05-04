import React, { useEffect } from 'react';

import Rating from 'src/components/video/rating/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideosAction } from 'src/components/video/redux/actions/fetchVideosAction';
import VideoPlayer from 'src/components/video/player/VideoPlayer';
import VideoButtons from 'src/components/video/buttons/videoButtons/VideoButtons';
import { VideoCard } from './videoCard';

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
        query: 'Counting On A Friend',
        page: 1,
      }),
    );
  }, []);

  return (
    <div style={{ padding: '50px', marginTop: '100px', marginBottom: '100px' }}>
      {Object.keys(videos).map((it, i) => {
        const video = videos[it];
        console.log(video);
        return (
          <VideoCard
            video={video}
            rating={<Rating video={video} />}
            videoPlayer={
              <VideoPlayer video={video} videoIndex={i} mode="card" />
            }
            videoActionButtons={<VideoButtons video={video} mode={'card'} />}
          />
        );
      })}
    </div>
  );
};
