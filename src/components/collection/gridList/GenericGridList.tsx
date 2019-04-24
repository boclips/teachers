import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ReadOnlyCollectionKey } from '../../../types/CollectionKey';
import State from '../../../types/State';
import { VideoCollection } from '../../../types/VideoCollection';
import { fetchBookmarkedCollectionsAction } from '../redux/actions/fetchBookmarkedCollectionsAction';
import { fetchNextBookmarkedCollectionsAction } from '../redux/actions/fetchNextBookmarkedCollectionsAction';
import { fetchNextPublicCollectionsAction } from '../redux/actions/fetchNextPublicCollectionsAction';
import { fetchPublicCollectionsAction } from '../redux/actions/fetchPublicCollectionsAction';
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

class GenericGridList extends React.PureComponent<
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
    this.fetchCollectionsIfNeeded();
  }

  private fetchCollectionsIfNeeded() {
    if (!this.props.collections) {
      this.props.fetchCollections();
    }
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: Props,
): DispatchProps => ({
  fetchCollections: () => {
    switch (props.collectionKey) {
      case 'bookmarkedCollections':
        dispatch(fetchBookmarkedCollectionsAction());
        break;
      case 'publicCollections':
        dispatch(fetchPublicCollectionsAction());
        break;
    }
  },

  fetchNextPage: () => {
    switch (props.collectionKey) {
      case 'bookmarkedCollections':
        dispatch(fetchNextBookmarkedCollectionsAction());
        break;
      case 'publicCollections':
        dispatch(fetchNextPublicCollectionsAction());
        break;
    }
  },
});

function mapStateToProps({ collections }: State, props: Props): StateProps {
  return {
    collections:
      collections[props.collectionKey] &&
      collections[props.collectionKey].items,
    hasMoreCollections:
      collections[props.collectionKey] &&
      collections[props.collectionKey].links.next &&
      true,
  };
}

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps,
)(GenericGridList);
