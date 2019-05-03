import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CollectionKey } from '../../../../types/CollectionKey';
import Page from '../../../../types/Page';
import State, { Pageable } from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';
import { fetchNextPageableCollectionsAction } from '../../redux/actions/fetchNextPageableCollectionsAction';
import { fetchPageableCollectionsAction } from '../../redux/actions/fetchPageableCollectionsAction';
import {
  CollectionCardList,
  CollectionCardListProps,
} from './CollectionCardList';

interface Props {
  collectionKey: CollectionKey;
  renderIfEmptyCollection?: ReactNode;
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

class PageableCollectionCardList extends React.PureComponent<
  Props & CollectionCardListProps & StateProps & DispatchProps
> {
  public render() {
    const emptyCollection =
      !this.props.collections || this.props.collections.length === 0;

    if (!this.props.loading && emptyCollection) {
      return this.props.renderIfEmptyCollection || null;
    }

    return (
      <CollectionCardList
        {...this.props}
        collections={this.props.collections}
        infiniteScroll={
          this.props.maxNumberOfCollections
            ? undefined
            : {
                next: this.props.fetchNextPage,
                hasMore: this.props.hasMoreCollections,
              }
        }
      />
    );
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

export default connect<StateProps, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps,
)(PageableCollectionCardList);
