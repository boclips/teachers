import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import State from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import { addToCollectionAction } from '../../../collection/redux/actions/addToCollectionAction';
import { removeFromCollectionAction } from '../../../collection/redux/actions/removeFromCollectionAction';
import VideoCollectionToggleButton from './VideoCollectionToggleButton';

interface StateProps {
  collections: VideoCollection[];
}

export interface OwnProps {
  video: Video;
}

interface DispatchProps {
  onAddToCollection: (collection: VideoCollection) => () => {};
  onRemoveFromCollection: (collection: VideoCollection) => () => {};
}

class SaveToCollectionButton extends React.PureComponent<
  StateProps & OwnProps & DispatchProps
> {
  public render() {
    return (
      <VideoCollectionToggleButton
        onRemove={this.props.onRemoveFromCollection}
        onAdd={this.props.onAddToCollection}
        collections={this.props.collections}
        video={this.props.video}
      />
    );
  }
}

function mapDispatchToProps(
  dispatch: Dispatch,
  props: OwnProps,
): DispatchProps {
  return {
    onAddToCollection: (collection: VideoCollection) => () =>
      dispatch(addToCollectionAction({ video: props.video, collection })),
    onRemoveFromCollection: (collection: VideoCollection) => () =>
      dispatch(removeFromCollectionAction({ video: props.video, collection })),
  };
}

function mapStateToProps({ collections }: State): StateProps {
  return {
    collections: collections.items,
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(SaveToCollectionButton);
