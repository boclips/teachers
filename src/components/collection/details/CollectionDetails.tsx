import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CollectionDetailsContent } from 'src/components/collection/details/CollectionDetailsContent';
import { CollectionDetailsNotFound } from 'src/components/collection/details/CollectionDetailsNotFound';
import State from '../../../types/State';
import { VideoCardsPlaceholder } from '../../searchResults/VideoCardsPlaceholder';
import { fetchCollectionAction } from '../redux/actions/fetchCollectionAction';
import { storeCollectionBeingViewedAction } from '../redux/actions/storeCollectionBeingViewedAction';
import { getCollectionById } from '../redux/reducers/collectionEntitiesReducer';
import { CollectionShareCodeDialog } from '../sharing/CollectionShareCodeDialog/CollectionShareCodeDialog';
import { useRefererIdInjector } from '../../../hooks/useRefererIdInjector';
import { CollectionHeader } from './header/CollectionHeader';

interface OwnProps {
  collectionId: string;
}

export const CollectionDetails = React.memo((props: OwnProps) => {
  const dispatch = useCallback(useDispatch(), []);
  const referer = useRefererIdInjector();
  const collection = useSelector((state: State) =>
    getCollectionById(state, props.collectionId),
  );
  const userId = useSelector((state: State) =>
    state.user ? state.user.id : null,
  );

  useEffect(() => {
    if (!collection) {
      dispatch(fetchCollectionAction({ id: props.collectionId }));
    }
  }, []);

  useEffect(() => {
    dispatch(storeCollectionBeingViewedAction({ id: props.collectionId }));
  }, [dispatch, props.collectionId]);

  if (!collection) {
    // TODO: referer anonymous and user not logged in, or 404
    const isAnonymous = !referer || referer === 'anonymous';
    if (isAnonymous) {
      return <CollectionDetailsNotFound />;
    }

    return (
      <React.Fragment>
        <section
          className="collection-view-placeholders"
          data-qa="collection-skeleton"
        >
          <CollectionHeader.Skeleton />
          <VideoCardsPlaceholder />
        </section>
        <CollectionShareCodeDialog collectionId={props.collectionId} />
      </React.Fragment>
    );
  }

  return <CollectionDetailsContent collection={collection} userId={userId} />;
});
