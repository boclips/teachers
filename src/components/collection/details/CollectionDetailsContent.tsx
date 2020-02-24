import { VideoCollection } from 'src/types/VideoCollection';
import State from 'src/types/State';
import Helmet from 'react-helmet';
import { CollectionHeader } from 'src/components/collection/details/header/CollectionHeader';
import { CollectionVideoCardList } from 'src/components/video/list/VideoCardList';
import React, { useEffect, useState } from 'react';
import { CollectionDetailsEmpty } from 'src/components/collection/details/CollectionDetailsEmpty';
import { fetchVideosByIdsAction } from 'src/components/video/redux/actions/fetchVideosByIdsAction';
import { useDispatch, useSelector } from 'react-redux';

export const CollectionDetailsContent = (props: {
  collection: VideoCollection;
  userId: string;
}) => {
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const videosState = useSelector((state: State) => state.entities.videos);

  useEffect(() => {
    if (props.collection.videoIds.length > 0) {
      dispatch(
        fetchVideosByIdsAction({
          videos: props.collection.videoIds,
        }),
      );
    }
  }, []);

  useEffect(() => {
    setVideos(
      props.collection.videoIds.map(videoId => videosState.byId[videoId.value]),
    );
  }, [videosState.byId]);

  return (
    <section className="collection-view__collection-details">
      <Helmet>
        <title>{props.collection.title}</title>
      </Helmet>
      <CollectionHeader collection={props.collection} />
      {props.collection.videoIds.length === 0 ? (
        <CollectionDetailsEmpty />
      ) : (
        videos && (
          <CollectionVideoCardList
            videos={videos}
            userId={props.userId}
            currentCollection={props.collection}
          />
        )
      )}
    </section>
  );
};
