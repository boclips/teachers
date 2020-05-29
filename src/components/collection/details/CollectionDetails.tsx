import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CollectionDetailsContent } from 'src/components/collection/details/CollectionDetailsContent';
import { CollectionDetailsNotFound } from 'src/components/collection/details/CollectionDetailsNotFound';
import { ParentCollectionDetailsContent } from 'src/components/collection/details/ParentCollectionDetailsContent';
import { CollectionBanner } from 'src/components/collection/details/header/CollectionBanner';
import DigitalCitizenshipSVG from 'resources/images/digital-citizenship-banner-image.svg';
import PageLayout from 'src/components/layout/PageLayout';
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
  }, [collection, dispatch, props]);

  useEffect(() => {
    dispatch(storeCollectionBeingViewedAction({ id: props.collectionId }));
  }, [dispatch, props]);

  if (!collection) {
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
  const isParentCollection = () => collection.subCollections.length > 0;
  console.log('rendering collection - ', collection);
  return (
    <PageLayout
      showSearchBar={true}
      showFooter={true}
      showNavigation={true}
      subheader={
        isParentCollection() ? (
          <CollectionBanner
            title={collection.title}
            subtitle={'Digital Citizenship'}
            image={<DigitalCitizenshipSVG />}
          />
        ) : null
      }
    >
      {isParentCollection() ? (
        <ParentCollectionDetailsContent
          collection={collection}
          userId={userId}
        />
      ) : (
        <CollectionDetailsContent collection={collection} userId={userId} />
      )}
    </PageLayout>
  );
});
