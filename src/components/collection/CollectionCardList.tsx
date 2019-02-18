import React from 'react';
import collections from '../../../resources/images/collections.png';
import { VideoCollection } from '../../types/VideoCollection';
import { CollectionCard } from './CollectionCard';

interface Props {
  collections: VideoCollection[];
}

export class CollectionCardList extends React.PureComponent<Props> {
  public render() {
    return (
      <React.Fragment>
        <h1 className="big-title alt">
          {' '}
          <img src={collections} /> My video collections
        </h1>
        {this.props.collections.map(collection => {
          return <CollectionCard key={collection.id} collection={collection} />;
        })}
      </React.Fragment>
    );
  }
}
