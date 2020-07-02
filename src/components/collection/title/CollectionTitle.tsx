import React from 'react';
import { Link } from 'react-router-dom';
import { VideoCollection } from '../../../types/VideoCollection';
import './CollectionTitle.less';

interface Props {
  collection: VideoCollection;
}

export class CollectionTitle extends React.PureComponent<Props> {
  public render() {
    return (
      <section className={'collection-title-section'}>
        <h1
          data-qa="collection-title"
          id={this.props.collection.id}
          tabIndex={0}
          className="collection-title"
        >
          <Link
            to={`/collections/${this.props.collection.id}`}
            tabIndex={-1}
            onClick={this.handleOnClick}
          >
            {this.props.collection.title}
          </Link>
        </h1>
      </section>
    );
  }

  private handleOnClick = (event) => event.preventDefault();
}
