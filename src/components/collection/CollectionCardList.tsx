import React from 'react';
import { VideoCollection } from '../../types/VideoCollection';
import { CollectionCard } from './CollectionCard';

interface Props {
  collections: VideoCollection[];
}

export class CollectionCardList extends React.PureComponent<Props> {
  public render() {
    return (
      <React.Fragment>
        {this.props.collections.map(collection => {
          return <CollectionCard key={collection.id} collection={collection} />;
        })}
      </React.Fragment>
    );
  }
}
