import React, { ReactNode } from 'react';
import withPageableCollection, {
  WithPageableCollectionProps,
} from '../../../common/higherOrderComponents/withPageableCollection';
import {
  CollectionCardList,
  CollectionCardListProps,
} from './CollectionCardList';

export interface PageableCollectionCardListProps {
  renderIfEmptyCollection?: ReactNode;
  title: string | React.ReactFragment;
  emptyPlaceholder?: string | React.ReactFragment;
  description?: string;
  grid?: boolean;
  maxNumberOfCollections?: number;
  shouldRefresh?: () => boolean;
}

class PageableCollectionCardList extends React.PureComponent<
  PageableCollectionCardListProps &
    CollectionCardListProps &
    WithPageableCollectionProps
> {
  public componentDidMount() {
    if (
      !this.props.collections ||
      (this.props.shouldRefresh && this.props.shouldRefresh())
    ) {
      this.props.fetchCollections();
    }
  }

  public render() {
    if (!this.props.collections) {
      return null;
    }

    const emptyCollection = this.props.collections.length === 0;

    if (!this.props.loading && emptyCollection) {
      return this.props.renderIfEmptyCollection || null;
    }

    return (
      <CollectionCardList
        /* eslint-disable-next-line react/jsx-props-no-spreading */
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
}

export default withPageableCollection<PageableCollectionCardListProps>(
  PageableCollectionCardList,
);
