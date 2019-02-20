import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import State from '../../../types/State';
import { Video } from '../../../types/Video';
import { addToDefaultCollectionAction } from '../../collection/redux/actions/addToDefaultCollectionAction';
import { removeFromDefaultCollectionAction } from '../../collection/redux/actions/removeFromDefaultCollectionAction';
import VideoCollectionButton from './videoCollectionButton/VideoCollectionButton';

interface StateProps {
  collectionVideoIds: string[];
}

interface OwnProps {
  video: Video;
  style: 'search' | 'collection';
}

interface DispatchProps {
  onAddToDefaultCollection: () => {};
  onRemoveFromDefaultCollection: () => {};
}

class SaveToCollectionButton extends React.PureComponent<
  StateProps & OwnProps & DispatchProps
> {
  public render() {
    const isVideoInCollection =
      this.props.collectionVideoIds.indexOf(this.props.video.id) > -1;

    return (
      <VideoCollectionButton
        isInDefaultCollection={isVideoInCollection}
        style={this.props.style}
        onAddToDefaultCollection={this.props.onAddToDefaultCollection}
        onRemoveFromDefaultCollection={this.props.onRemoveFromDefaultCollection}
      />
    );
  }
}

function mapDispatchToProps(
  dispatch: Dispatch,
  props: OwnProps,
): DispatchProps {
  return {
    onAddToDefaultCollection: () =>
      dispatch(addToDefaultCollectionAction(props.video)),
    onRemoveFromDefaultCollection: () =>
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
