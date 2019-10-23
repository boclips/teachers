import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { CollectionKey } from '../../../types/CollectionKey';
import { CollectionSearchRequest } from '../../../types/CollectionSearchRequest';
import Page from '../../../types/Page';
import State from '../../../types/State';
import { VideoCollection } from '../../../types/VideoCollection';
import { fetchNextPageableCollectionsAction } from '../../collection/redux/actions/fetchNextPageableCollectionsAction';
import { fetchPageableCollectionsAction } from '../../collection/redux/actions/fetchPageableCollectionsAction';

interface Props {
  collectionKey: CollectionKey;
  collectionFiler?: CollectionSearchRequest;
}

interface StateProps {
  collections: VideoCollection[];
  hasMoreCollections: boolean;
  loading: boolean;
}

interface DispatchProps {
  fetchCollections: () => void;
  fetchNextPage: () => void;
}

export interface WithPageableCollectionProps
  extends StateProps,
    DispatchProps {}

const withPageableCollection = Component => (
  props: Props & DispatchProps & StateProps,
) => {
  return <Component {...props} />;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: Props,
): DispatchProps => ({
  fetchCollections: () =>
    dispatch(
      fetchPageableCollectionsAction({
        key: props.collectionKey,
        request: props.collectionFiler,
      }),
    ),
  fetchNextPage: () =>
    dispatch(fetchNextPageableCollectionsAction(props.collectionKey)),
});

function mapStateToProps(state: State, props: Props): StateProps {
  const pageOfCollectionIds: Page<string> = new Page(
    state.collections[props.collectionKey],
  );

  const foundCollections =
    pageOfCollectionIds.items() &&
    pageOfCollectionIds
      .items()
      .map(id => state.entities.collections.byId[id])
      .filter(collection => collection !== undefined);

  return {
    collections: foundCollections,
    hasMoreCollections: pageOfCollectionIds.hasNextPage(),
    loading: state.collections.loading,
  };
}

export default function<T>(args: any) {
  return compose<React.ComponentType<T & Props>>(
    connect<StateProps, DispatchProps, Props>(
      mapStateToProps,
      mapDispatchToProps,
    ),
    withPageableCollection,
  )(args);
}
