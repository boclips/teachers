import React from 'react';
import { Link } from 'react-router-dom';
import { VideoCollection } from '../../../types/VideoCollection';
import './CollectionTitle.less';

interface Props {
  collection: VideoCollection;
  clickableHeader?: boolean;
}

export class CollectionTitle extends React.PureComponent<Props> {
  private handleOnClick = (event) => event.preventDefault();

  public render() {
    return (
      <section className="collection-title-section">
        <h1
          data-qa="collection-title"
          id={this.props.collection.id}
          className="collection-title"
        >
          {this.props.clickableHeader ? (
            <Link
              to={`/collections/${this.props.collection.id}`}
              onClick={this.handleOnClick}
            >
              {this.props.collection.title}
            </Link>
          ) : (
            this.props.collection.title
          )}
        </h1>
      </section>
    );
  }
}
