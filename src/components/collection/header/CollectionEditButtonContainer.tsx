import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { VideoCollection } from '../../../types/VideoCollection';
import {
  editCollectionAction,
  EditCollectionRequest,
} from '../redux/actions/editCollectionAction';
import CollectionEditButton from './CollectionEditButton';

interface Props {
  collection: VideoCollection;
}

interface DispatchProps {
  patchCollection: (request: EditCollectionRequest) => void;
}

class CollectionEditButtonContainer extends React.PureComponent<
  Props & DispatchProps
> {
  public render() {
    return this.props.collection.links.edit ? (
      <CollectionEditButton
        onUpdate={this.props.patchCollection}
        collection={this.props.collection}
      />
    ) : null;
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  patchCollection: (request: EditCollectionRequest) =>
    dispatch(editCollectionAction(request)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CollectionEditButtonContainer);
