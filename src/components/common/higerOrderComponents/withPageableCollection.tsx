import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { CollectionKey } from '../../../types/CollectionKey';
import Page from '../../../types/Page';
import State, { Pageable } from '../../../types/State';
import { VideoCollection } from '../../../types/VideoCollection';
import { fetchNextPageableCollectionsAction } from '../../collection/redux/actions/fetchNextPageableCollectionsAction';
import { fetchPageableCollectionsAction } from '../../collection/redux/actions/fetchPageableCollectionsAction';

interface Props {
  collectionKey: CollectionKey;
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
    dispatch(fetchPageableCollectionsAction(props.collectionKey)),
  fetchNextPage: () =>
    dispatch(fetchNextPageableCollectionsAction(props.collectionKey)),
});

function mapStateToProps(state: State, props: Props): StateProps {
  const collectionsOfType: Pageable<VideoCollection> =
    state.collections[props.collectionKey];

  return {
    collections: new Page(collectionsOfType).items(),
    hasMoreCollections: new Page(collectionsOfType).hasNextPage(),
    loading: state.collections.loading,
  };
}

// TODO figure out how to type the HOC properly
export default compose<any>(
  connect<StateProps, DispatchProps, Props>(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPageableCollection,
);
