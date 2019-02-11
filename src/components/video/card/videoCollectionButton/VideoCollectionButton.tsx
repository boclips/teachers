import React from 'react';
import { VideoCollectionRemoveButton } from './VideoCollectionRemoveButton';
import VideoCollectionToggleButton from './VideoCollectionToggleButton';

export interface Props {
  isInDefaultCollection: boolean;
  style: 'search' | 'collection';
  onAddToDefaultCollection: () => void;
  onRemoveFromDefaultCollection: () => void;
}

export default class VideoCollectionButton extends React.PureComponent<Props> {
  public render() {
    return this.props.style === 'collection' ? (
      <VideoCollectionRemoveButton
        onRemove={this.props.onRemoveFromDefaultCollection}
      />
    ) : (
      <VideoCollectionToggleButton
        onRemove={this.props.onRemoveFromDefaultCollection}
        onAdd={this.props.onAddToDefaultCollection}
        isInDefaultCollection={this.props.isInDefaultCollection}
      />
    );
  }
}
