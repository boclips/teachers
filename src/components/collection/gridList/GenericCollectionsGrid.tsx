import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ReadOnlyCollectionKey } from '../../../types/CollectionKey';
import Page from '../../../types/Page';
import State, { Pageable } from '../../../types/State';
import { VideoCollection } from '../../../types/VideoCollection';
import { fetchNextPageableCollectionsAction } from '../redux/actions/fetchNextPageableCollectionsAction';
import { fetchReadOnlyCollectionsAction } from '../redux/actions/fetchReadOnlyCollectionsAction';
import BookmarkedCollectionsGrid from './bookmarked/BookmarkedCollectionsGrid';
import PublicCollectionsGrid from './public/PublicCollectionsGrid';

interface Props {
  collectionKey: ReadOnlyCollectionKey;
  maxNumberOfCollections?: number;
  description?: string;
}

interface StateProps {
  collections: VideoCollection[];
  hasMoreCollections: boolean;
}

interface DispatchProps {
  fetchCollections: () => void;
  fetchNextPage: () => void;
}

class GenericCollectionsGrid extends React.PureComponent<
  StateProps & DispatchProps & Props
> {
  public render() {
    switch (this.props.collectionKey) {
      case 'publicCollections':
        return <PublicCollectionsGrid {...this.props} />;
      case 'bookmarkedCollections':
        return <BookmarkedCollectionsGrid {...this.props} />;
    }
  }

  public componentDidMount() {
    if (!this.props.collections) {
      this.props.fetchCollections();
    }
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: Props,
): DispatchProps => ({
  fetchCollections: () =>
    dispatch(fetchReadOnlyCollectionsAction(props.collectionKey)),
  fetchNextPage: () =>
    dispatch(fetchNextPageableCollectionsAction(props.collectionKey)),
});

function mapStateToProps({ collections }: State, props: Props): StateProps {
  const collectionsOfType: Pageable<VideoCollection> =
    collections[props.collectionKey];

  return {
    collections: new Page(collectionsOfType).items(),
    hasMoreCollections: new Page(collectionsOfType).hasNextPage(),
  };
}

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps,
)(GenericCollectionsGrid);
