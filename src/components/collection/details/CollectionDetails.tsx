import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CollectionDetailsContent } from 'src/components/collection/details/CollectionDetailsContent';
import { DetailsNotFound } from 'src/components/common/DetailsNotFound';
import { ParentCollectionDetailsContent } from 'src/components/collection/details/ParentCollectionDetailsContent';
import { CollectionBanner } from 'src/components/collection/details/header/CollectionBanner';
import DigitalCitizenshipSVG from 'resources/images/digital-citizenship-banner-image.svg';
import PageLayout from 'src/components/layout/PageLayout';
import { ShareCodeDialog } from 'src/components/common/share/ShareCodeDialog/ShareCodeDialog';
import { useRefererIdInjector } from 'src/hooks/useRefererIdInjector';
import { isUserActive } from 'src/services/users/isUserActive';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { PlatformInteractionType } from 'src/services/analytics/boclips/PlatformInteractionType';
import { InactiveRefererModal } from 'src/components/video/details/InactiveRefererModal';
import { LoadingComponent } from 'src/components/common/LoadingComponent';
import { CollectionHeader } from './header/CollectionHeader';
import { getCollectionById } from '../redux/reducers/collectionEntitiesReducer';
import { storeCollectionBeingViewedAction } from '../redux/actions/storeCollectionBeingViewedAction';
import { fetchCollectionAction } from '../redux/actions/fetchCollectionAction';
import { VideoCardsPlaceholder } from '../../searchResults/VideoCardsPlaceholder';
import State from '../../../types/State';

interface OwnProps {
  collectionId: string;
}

const sendPlatformInteractionEvent = AnalyticsFactory.internalAnalytics()
  .trackPlatformInteraction;
const { REFERER_INACTIVE } = PlatformInteractionType;

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
  const isCollectionLoading = useSelector(
    (state: State) => state.collections?.loading,
  );

  const isLoggedIn = useSelector(
    (state: State) => state.authentication.status === 'authenticated',
  );
  const shareCode = useSelector(
    (state: State) => state.authentication.shareCode,
  );

  const refererId = useSelector(
    (state: State) => state.authentication.refererId,
  );

  const [refererIsActive, setRefererIsActive] = useState<boolean | null>(null);

  useEffect(() => {
    if (!collection) {
      if (isLoggedIn) {
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
  }, [collection, dispatch, props, shareCode, refererId, isLoggedIn]);

  useEffect(() => {
    dispatch(storeCollectionBeingViewedAction({ id: props.collectionId }));
  }, [dispatch, props]);

  useEffect(() => {
    if (!isLoggedIn) {
      isUserActive(referer).then((isActive) => {
        setRefererIsActive(isActive);
      });
    }
  }, [referer, isLoggedIn]);

  useEffect(() => {
    if (refererIsActive === false) {
      sendPlatformInteractionEvent(REFERER_INACTIVE, true);
    }
  }, [refererIsActive]);

  const digitalCitizenshipBanner = (collectionTitle) => (
    <CollectionBanner
      title={collectionTitle}
      subtitle="Digital Citizenship"
      image={<DigitalCitizenshipSVG />}
    />
  );

  if (!collection) {
    const missingReferer = !isLoggedIn && isAnonymous;
    const isAuthenticated = isLoggedIn || shareCode;

    if (missingReferer || (isAuthenticated && !isCollectionLoading)) {
      return (
        <PageLayout showSearchBar showFooter showNavigation>
          <DetailsNotFound
            title="Oops!!"
            message="The collection you tried to access is not available."
            dataQa="collection-not-found"
          />
        </PageLayout>
      );
    }

    const requireShareCode = !shareCode && !isLoggedIn;

    return (
      <PageLayout showSearchBar showFooter showNavigation>
        <>
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
        </>
      </PageLayout>
    );
  }

  if (!isLoggedIn && !refererIsActive) {
    return (
      <PageLayout showNavigation showFooter showSearchBar>
        {refererIsActive === false ? (
          <InactiveRefererModal resourceType="collection" />
        ) : (
          <LoadingComponent />
        )}
      </PageLayout>
    );
  }

  const isParentCollection = () => collection.subCollections.length > 0;
  return isParentCollection() ? (
    <PageLayout
      showSearchBar
      showFooter
      showNavigation
      subheader={digitalCitizenshipBanner(collection.title)}
    >
      <ParentCollectionDetailsContent collection={collection} userId={userId} />
    </PageLayout>
  ) : (
    <PageLayout showSearchBar showFooter showNavigation>
      <CollectionDetailsContent collection={collection} userId={userId} />
    </PageLayout>
  );
});
