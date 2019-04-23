import { Button } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import { removeVideoFromCollectionAction } from '../../../collection/redux/actions/removeFromCollectionAction';

interface Props {
  video: Video;
  collection: VideoCollection;
}

interface DispatchProps {
  onRemoveFromCollection: () => {};
}

class RemoveFromVideoCollectionButton extends React.PureComponent<
  DispatchProps & Props
> {
  public render() {
    return (
      <Button
        className="toggle-collection-button"
        data-qa="remove-from-collection"
        onClick={this.props.onRemoveFromCollection}
        size={'large'}
      >
        Remove
      </Button>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch, props: Props): DispatchProps {
  return {
    onRemoveFromCollection: () =>
      dispatch(
        removeVideoFromCollectionAction({
          video: props.video,
          collection: props.collection,
        }),
      ),
  };
}

export default connect<{}, DispatchProps, Props>(
  null,
  mapDispatchToProps,
)(RemoveFromVideoCollectionButton);
