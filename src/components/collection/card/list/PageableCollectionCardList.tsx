import React, { ReactNode } from 'react';
import withPageableCollection, {
  WithPageableCollectionProps,
} from '../../../common/higerOrderComponents/withPageableCollection';
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
  sidebar?: boolean;
  maxNumberOfCollections?: number;
  shouldRefresh?: () => boolean;
  showPrivacy?: boolean;
}

class PageableCollectionCardList extends React.PureComponent<
  PageableCollectionCardListProps &
    CollectionCardListProps &
    WithPageableCollectionProps
> {
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
        showPrivacy={this.props.showPrivacy}
      />
    );
  }

  public componentDidMount() {
    if (
      !this.props.collections ||
      (this.props.shouldRefresh && this.props.shouldRefresh())
    ) {
      this.props.fetchCollections();
    }
  }
}

export default withPageableCollection<PageableCollectionCardListProps>(
  PageableCollectionCardList,
);
