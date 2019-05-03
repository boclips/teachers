import React from 'react';
import collectionsImg from '../../../../../resources/images/collections.png';
import PageableCollectionCardList from '../../card/list/PageableCollectionCardList';

interface Props {
  maxNumberOfCollections?: number;
  description?: string;
}

class PublicCollectionsGrid extends React.PureComponent<Props> {
  public render() {
    return (
      <PageableCollectionCardList
        title={
          <span>
            <img src={collectionsImg} alt="" /> Most recent video collections
          </span>
        }
        description={this.props.description}
        grid={true}
        maxNumberOfCollections={this.props.maxNumberOfCollections}
        collectionKey="publicCollections"
      />
    );
  }
}

export default PublicCollectionsGrid;
