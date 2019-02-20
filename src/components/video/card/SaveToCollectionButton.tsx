import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Video } from '../../../types/Video';
import { addToDefaultCollectionAction } from '../../collection/redux/actions/addToDefaultCollectionAction';
import { removeFromDefaultCollectionAction } from '../../collection/redux/actions/removeFromDefaultCollectionAction';
import VideoCollectionButton from './videoCollectionButton/VideoCollectionButton';

interface OwnProps {
  isInCollection: boolean;
  video: Video;
  style: 'search' | 'collection';
}

interface DispatchProps {
  onAddToDefaultCollection: () => {};
  onRemoveFromDefaultCollection: () => {};
}

class SaveToCollectionButton extends React.PureComponent<
  OwnProps & DispatchProps
> {
  public render() {
    return (
      <VideoCollectionButton
        isInDefaultCollection={this.props.isInCollection}
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

export default connect(
  null,
  mapDispatchToProps,
)(SaveToCollectionButton);
