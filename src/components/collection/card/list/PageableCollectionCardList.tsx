import React, { ReactNode } from 'react';
import { CollectionKey } from '../../../../types/CollectionKey';
import withPageableCollection, {
  WithPageableCollectionProps,
} from '../../../common/higerOrderComponents/withPageableCollection';
import {
  CollectionCardList,
  CollectionCardListProps,
} from './CollectionCardList';

interface Props {
  collectionKey: CollectionKey;
  renderIfEmptyCollection?: ReactNode;
}

class PageableCollectionCardList extends React.PureComponent<
  Props & CollectionCardListProps & WithPageableCollectionProps
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

export default withPageableCollection(PageableCollectionCardList);
