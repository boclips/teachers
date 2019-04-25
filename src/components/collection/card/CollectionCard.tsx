import classnames from 'classnames';
import React from 'react';
import { VideoCollection } from '../../../types/VideoCollection';
import './CollectionCard.less';
import CollectionCardVideoPreviews from './CollectionCardVideoPreviews';
import CollectionCardHeader from './header/CollectionCardHeader';

interface Props {
  collection: VideoCollection;
  numberOfPreviews: number;
  tiny?: boolean;
  onClick?: React.MouseEventHandler;
}

export class CollectionCard extends React.PureComponent<Props> {
  public render() {
    return (
      <section
        key={`card-${this.props.collection.id}`}
        className={classnames('collection-card', {
          tiny: this.props.tiny,
          clickable: !!this.props.onClick,
        })}
        data-qa="collection-card"
        data-state={this.props.collection.title}
        onClick={this.props.onClick}
      >
        <CollectionCardHeader
          collection={this.props.collection}
          showRemoveButton={!this.props.tiny}
        />
        <CollectionCardVideoPreviews
          numberOfPreviews={this.props.numberOfPreviews}
          videos={this.props.collection.videoIds.map(
            videoId => this.props.collection.videos[videoId.id],
          )}
          isGrid={this.props.tiny}
          id={this.props.collection.id}
        />
      </section>
    );
  }
}
