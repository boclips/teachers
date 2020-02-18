import { Button, Icon } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RemoveSVG from 'resources/images/remove-video.svg';
import { Video } from 'src/types/Video';
import { VideoCollection } from 'src/types/VideoCollection';
import { removeVideoFromMyCollectionAction } from '../../../collection/redux/actions/removeFromMyCollectionAction';

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
        data-qa="remove-from-collection"
        onClick={this.props.onRemoveFromCollection}
      >
        <Icon component={RemoveSVG} /> <span>Remove</span>
      </Button>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch, props: Props): DispatchProps {
  return {
    onRemoveFromCollection: () =>
      dispatch(
        removeVideoFromMyCollectionAction({
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
