import React from 'react';
import { VideoCollection } from '../../types/VideoCollection';

interface Props {
  collection: VideoCollection;
}

export class CollectionCard extends React.PureComponent<Props> {
  public render() {
    return (
      <section data-qa="collection-card">
        <span data-qa="collection-title">{this.props.collection.title}</span>
        <span data-qa="collection-number-of-videos">
          {this.props.collection.videos.length}
        </span>
      </section>
    );
  }
}
