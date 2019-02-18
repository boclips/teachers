import React from 'react';
import { Link } from 'react-router-dom';
import { VideoCollection } from '../../types/VideoCollection';
import './CollectionCard.less';

interface Props {
  collection: VideoCollection;
}

export class CollectionCard extends React.PureComponent<Props> {
  public render() {
    return (
      <section className="collection-card" data-qa="collection-card">
        <h1 className="collection-title" data-qa="collection-title">
          {this.props.collection.title}
        </h1>
        <span className="highlight">
          <span data-qa="collection-number-of-videos">
            {this.props.collection.videos.length}
          </span>{' '}
          videos
        </span>
        <h3 className="view-collection">
          <Link to={'/collections/' + this.props.collection.id}>
            View collection
          </Link>
        </h3>
      </section>
    );
  }
}
