import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import State from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { addToDefaultCollectionAction } from '../../../collection/redux/actions/addToDefaultCollectionAction';
import { removeFromDefaultCollectionAction } from '../../../collection/redux/actions/removeFromDefaultCollectionAction';
import { VideoCollectionRemoveButton } from './VideoCollectionRemoveButton';
import VideoCollectionToggleButton from './VideoCollectionToggleButton';

interface StateProps {
  collectionVideoIds: string[];
}

export interface OwnProps {
  video: Video;
  style: 'search' | 'collection';
}

interface DispatchProps {
  onAddToCollection: () => {};
  onRemoveFromCollection: () => {};
}

class SaveToCollectionButton extends React.PureComponent<
  StateProps & OwnProps & DispatchProps
> {
  public render() {
    const isVideoInCollection =
      this.props.collectionVideoIds.indexOf(this.props.video.id) > -1;

    return this.props.style === 'collection' ? (
      <VideoCollectionRemoveButton
        onRemove={this.props.onRemoveFromCollection}
      />
    ) : (
      <VideoCollectionToggleButton
        onRemove={this.props.onRemoveFromCollection}
        onAdd={this.props.onAddToCollection}
        isInDefaultCollection={isVideoInCollection}
      />
    );
  }
}

function mapDispatchToProps(
  dispatch: Dispatch,
  props: OwnProps,
): DispatchProps {
  return {
    onAddToCollection: () =>
      dispatch(addToDefaultCollectionAction(props.video)),
    onRemoveFromCollection: () =>
      dispatch(removeFromDefaultCollectionAction(props.video)),
  };
}

function mapStateToProps({ videoCollection }: State): StateProps {
  return {
    collectionVideoIds: videoCollection.videos.map(video => video.id),
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(SaveToCollectionButton);
