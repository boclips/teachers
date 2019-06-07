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
  description?: string;
  grid?: boolean;
  sidebar?: boolean;
  maxNumberOfCollections?: number;
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
      />
    );
  }

  public componentDidMount() {
    if (!this.props.collections) {
      this.props.fetchCollections();
    }
  }
}

export default withPageableCollection<PageableCollectionCardListProps>(
  PageableCollectionCardList,
);
