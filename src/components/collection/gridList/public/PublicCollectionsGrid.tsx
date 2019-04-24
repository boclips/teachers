import React from 'react';
import collectionsImg from '../../../../../resources/images/collections.png';
import { VideoCollection } from '../../../../types/VideoCollection';
import { CollectionCardList } from '../../card/CollectionCardList';

interface Props {
  maxNumberOfCollections?: number;
  description?: string;
  collections: VideoCollection[];
  hasMoreCollections: boolean;
  fetchNextPage: () => void;
}

class PublicCollectionsGrid extends React.PureComponent<Props> {
  public render() {
    return (
      <CollectionCardList
        title={
          <span>
            <img src={collectionsImg} alt="" /> Most recent video collections
          </span>
        }
        description={this.props.description}
        grid={true}
        collections={this.props.collections}
        maxNumberOfCollections={this.props.maxNumberOfCollections}
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

export default PublicCollectionsGrid;
