import { Button, Icon } from 'antd';
import { CustomIconComponentProps } from 'antd/es/icon';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import removeSvg from '../../../../../resources/images/remove-video.svg';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
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
    const svg = removeSvg as React.ComponentType<CustomIconComponentProps>;
    return (
      <Button
        className="toggle-collection-button"
        data-qa="remove-from-collection"
        onClick={this.props.onRemoveFromCollection}
      >
        <Icon component={svg} /> <span>Remove</span>
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
