import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CollectionDetailsContent } from 'src/components/collection/details/CollectionDetailsContent';
import { CollectionDetailsNotFound } from 'src/components/collection/details/CollectionDetailsNotFound';
import { ParentCollectionDetailsContent } from 'src/components/collection/details/ParentCollectionDetailsContent';
import { CollectionBanner } from 'src/components/collection/details/header/CollectionBanner';
import DigitalCitizenshipSVG from 'resources/images/digital-citizenship-banner-image.svg';
import PageLayout from 'src/components/layout/PageLayout';
import { ShareCodeDialog } from 'src/components/common/share/ShareCodeDialog/ShareCodeDialog';
import State from '../../../types/State';
import { VideoCardsPlaceholder } from '../../searchResults/VideoCardsPlaceholder';
import { fetchCollectionAction } from '../redux/actions/fetchCollectionAction';
import { storeCollectionBeingViewedAction } from '../redux/actions/storeCollectionBeingViewedAction';
import { getCollectionById } from '../redux/reducers/collectionEntitiesReducer';
import { useRefererIdInjector } from '../../../hooks/useRefererIdInjector';
import { CollectionHeader } from './header/CollectionHeader';

interface OwnProps {
  collectionId: string;
}

export const CollectionDetails = React.memo((props: OwnProps) => {
  const dispatch = useCallback(useDispatch(), []);
  const referer = useRefererIdInjector();
  const isAnonymous = !referer || referer === 'anonymous';
  const collection = useSelector((state: State) =>
    getCollectionById(state, props.collectionId),
  );
  const userId = useSelector((state: State) =>
    state.user ? state.user.id : null,
  );

  const isAuthenticated = useSelector(
    (state: State) => state.authentication.status === 'authenticated',
  );
  const shareCode = useSelector(
    (state: State) => state.authentication.shareCode,
  );

  const refererId = useSelector(
    (state: State) => state.authentication.refererId,
  );
  useEffect(() => {
    if (!collection) {
      if (isAuthenticated) {
        dispatch(fetchCollectionAction({ id: props.collectionId }));
      } else {
        dispatch(
          fetchCollectionAction({
            id: props.collectionId,
            referer: refererId,
            shareCode,
          }),
        );
      }
    }
  }, [collection, dispatch, props, shareCode, refererId, isAuthenticated]);

  useEffect(() => {
    dispatch(storeCollectionBeingViewedAction({ id: props.collectionId }));
  }, [dispatch, props]);

  if (!collection) {
    if (!isAuthenticated && isAnonymous) {
      return <CollectionDetailsNotFound />;
    }

    const requireShareCode = !shareCode && !isAuthenticated;

    return (
      <PageLayout showSearchBar={true} showFooter={true} showNavigation={true}>
        <React.Fragment>
          <section
            className="collection-view-placeholders"
            data-qa="collection-skeleton"
          >
            <CollectionHeader.Skeleton />
            <VideoCardsPlaceholder />
          </section>
          {requireShareCode && (
            <ShareCodeDialog
              title="Enter code to view collection"
              cta="View collection"
            />
          )}
        </React.Fragment>
      </PageLayout>
    );
  }
  const isParentCollection = () => collection.subCollections.length > 0;
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
