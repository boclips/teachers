import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCollectionSVG from '../../../../resources/images/empty-collection.svg';
import SadTeacherSVG from '../../../../resources/images/sad-teacher.svg';
import State, { VideoMap } from '../../../types/State';
import { VideoCardsPlaceholder } from '../../searchResults/VideoCardsPlaceholder';
import { CollectionVideoCardList } from '../../video/list/VideoCardList';
import { fetchVideosByIdsAction } from '../../video/redux/actions/fetchVideosByIdsAction';
import { fetchCollectionAction } from '../redux/actions/fetchCollectionAction';
import { storeCollectionBeingViewedAction } from '../redux/actions/storeCollectionBeingViewedAction';
import { getCollectionById } from '../redux/reducers/collectionsReducer';
import { CollectionShareCodeDialog } from '../sharing/CollectionShareCodeDialog/CollectionShareCodeDialog';
import { useRefererIdInjector } from '../../../hooks/useRefererIdInjector';
import { VideoCollection } from '../../../types/VideoCollection';
import { CollectionHeader } from './header/CollectionHeader';

interface OwnProps {
  collectionId: string;
}

export const CollectionDetailsSkeleton = () => (
  <section
    className="collection-view-placeholders"
    data-qa="collection-skeleton"
  >
    <CollectionHeader.Skeleton />
    <VideoCardsPlaceholder />
  </section>
);

export const CollectionDetails = (props: OwnProps) => {
  const dispatch = useDispatch();
  const referer = useRefererIdInjector();
  const [requestedCollection, setRequestedCollection] = useState<string>(null);
  const collection = useSelector((state: State) =>
    getCollectionById(state, props.collectionId),
  );
  const collectionsLoading = useSelector(
    (state: State) => state.collections.loading,
  );
  const allVideos = useSelector((state: State) => state.entities.videos.byId);
  const userId = useSelector((state: State) =>
    state.user ? state.user.id : null,
  );

  useEffect(() => {
    const collectionLoaded = !!collection;

    const differentCollection =
      collectionLoaded && collection.id !== props.collectionId;

    if (
      (!collectionLoaded || differentCollection) &&
      requestedCollection !== props.collectionId
    ) {
      dispatch(fetchCollectionAction({ id: props.collectionId }));
      setRequestedCollection(props.collectionId);
    }

    dispatch(storeCollectionBeingViewedAction({ id: props.collectionId }));

    if (collectionLoaded) {
      const videoIdsToFetch = collection.videoIds.filter(
        videoId => typeof allVideos[videoId.value] === 'undefined',
      );

      if (videoIdsToFetch.length > 0) {
        dispatch(
          fetchVideosByIdsAction({
            videos: videoIdsToFetch,
          }),
        );
      }
    }
  }, [
    allVideos,
    collection,
    dispatch,
    props.collectionId,
    requestedCollection,
  ]);

  if (!collection) {
    const promptForShareCode =
      !collectionsLoading &&
      requestedCollection === props.collectionId &&
      referer &&
      referer !== 'anonymous';

    if (collectionsLoading || promptForShareCode) {
      return (
        <React.Fragment>
          <CollectionDetailsSkeleton />
          {promptForShareCode && (
            <CollectionShareCodeDialog collectionId={props.collectionId} />
          )}
        </React.Fragment>
      );
    } else {
      return <CollectionDetailsNotFound />;
    }
  }
  return (
    <CollectionDetailsFull
      collection={collection}
      allVideos={allVideos}
      userId={userId}
    />
  );
};

const CollectionDetailsFull = (props: {
  collection: VideoCollection;
  allVideos: VideoMap;
  userId: string;
}) => {
  const videos = props.collection.videoIds.map(
    videoId => props.allVideos[videoId.value],
  );

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

const CollectionDetailsEmpty = () => (
  <Row data-qa="collection-view-empty" className="collection-view-empty">
    <Col md={{ offset: 6, span: 12 }} lg={{ offset: 8, span: 8 }}>
      <EmptyCollectionSVG />
      <h1 data-qa="collection-empty-title">This video collection is empty</h1>
      <p>
        You can add videos by searching for a topic and then clicking the Save
        button on your favorite videos
      </p>
    </Col>
  </Row>
);

const CollectionDetailsNotFound = () => (
  <section className="illustrated-page" data-qa="collection-not-found">
    <Row>
      <Col sm={{ span: 24 }} md={{ span: 8 }}>
        <section className="illustration">
          <SadTeacherSVG />
        </section>
      </Col>
      <Col sm={{ span: 24 }} md={{ span: 16 }}>
        <section className="message">
          <h1 className="big-title">Oops!!</h1>
          <p>The collection you tried to access is not available.</p>
        </section>
      </Col>
    </Row>
  </section>
);
