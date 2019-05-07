import React from 'react';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import ManageVideoCollectionsButton from './ManageVideoCollectionButton';
import RemoveFromVideoCollectionButton from './RemoveFromVideoCollectionButton';

interface OwnProps {
  video: Video | null;
  collection?: VideoCollection;
}

export default class VideoCollectionButton extends React.PureComponent<
  OwnProps
> {
  public render() {
    return this.props.collection && this.props.collection.links.removeVideo ? (
      <RemoveFromVideoCollectionButton
        video={this.props.video}
        collection={this.props.collection}
      />
    ) : (
      <ManageVideoCollectionsButton
        video={this.props.video}
        collectionKey="myCollections"
      />
    );
  }
}
