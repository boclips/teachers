import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import State from '../../../types/State';
import { VideoCollection } from '../../../types/VideoCollection';
import {
  editCollectionAction,
  EditCollectionRequest,
} from '../redux/actions/editCollectionAction';
import CollectionEditButton from './CollectionEditButton';

interface Props {
  collection: VideoCollection;
  className?: string;
}

interface StateProps {
  canSave: boolean;
}

interface DispatchProps {
  patchCollection: (request: EditCollectionRequest) => void;
}

class CollectionEditButtonContainer extends React.PureComponent<
  Props & StateProps & DispatchProps
> {
  public render() {
    return this.props.collection.links.edit ? (
      <section className={this.props.className}>
        <CollectionEditButton
          onUpdate={this.props.patchCollection}
          collection={this.props.collection}
          canSave={this.props.canSave}
        />
      </section>
    ) : null;
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  patchCollection: (request: EditCollectionRequest) =>
    dispatch(editCollectionAction(request)),
});

function mapStateToProps({ collections }: State): StateProps {
  return {
    canSave: !(collections.updating || collections.loading),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionEditButtonContainer);
