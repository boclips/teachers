import React from 'react';
import { Popover, Drawer } from 'antd';
import { useMediaBreakPoint } from 'src/hooks/useMediaBreakPoint';
import MediaBreakpoints from 'src/types/MediaBreakpoints';
import { CollectionKey } from 'src/types/CollectionKey';
import { useDispatch } from 'react-redux';
import { addVideoToMyCollectionAction } from 'src/components/collection/redux/actions/addToMyCollectionAction';
import { VideoCollection } from 'src/types/VideoCollection';
import { removeVideoFromMyCollectionAction } from 'src/components/collection/redux/actions/removeFromMyCollectionAction';
import { createCollectionAction } from 'src/components/collection/redux/actions/createCollectionAction';
import { CreateCollectionRequest } from 'src/services/collections/createCollection';
import { Video } from 'src/types/Video';
import './ManageVideoCollectionMenuContainer.less';
import ManageVideoCollectionMenu from './ManageVideoCollectionMenu';

interface Props {
  children?: React.ReactElement;
  isMenuVisible: boolean;
  collectionKey: CollectionKey;
  loading: boolean;
  video: Video;
  onVisibleChange: (visible: boolean) => void;
  onChange?: () => void;
  getPopupContainer?: () => HTMLElement | null;
}

const ManageVideCollectionMenuContainer = (props: Props) => {
  const breakpoint = useMediaBreakPoint();

  const dispatch = useDispatch();

  const onChange = () => {
    if (props.onChange) {
      props.onChange();
    }
  };

  const handleAddToCollection = (collection: VideoCollection) => {
    dispatch(addVideoToMyCollectionAction({ video: props.video, collection }));

    onChange();
  };

  const handleRemoveFromCollection = (collection: VideoCollection) => {
    dispatch(
      removeVideoFromMyCollectionAction({ video: props.video, collection }),
    );

    onChange();
  };

  const handleCreateCollection = (request: CreateCollectionRequest) => {
    dispatch(createCollectionAction(request));

    onChange();
  };

  const CollectionMenu = (
    <ManageVideoCollectionMenu
      onVisibleChange={props.onVisibleChange}
      onAddToCollection={handleAddToCollection}
      onRemoveFromCollection={handleRemoveFromCollection}
      collectionKey={props.collectionKey}
      video={props.video}
      onCreateCollection={handleCreateCollection}
    />
  );

  return (
    <React.Fragment>
      {breakpoint.width >= MediaBreakpoints.md.width ? (
        <span>
          <Popover
            title={props.loading ? 'Loading collections...' : 'Save to:'}
            overlayClassName="manage-video-collection-button__popover"
            autoAdjustOverflow={false}
            content={CollectionMenu}
            placement="bottomLeft"
            trigger="click"
            onVisibleChange={props.onVisibleChange}
            visible={props.isMenuVisible}
            getPopupContainer={props.getPopupContainer}
          >
            {props.children}
          </Popover>
        </span>
      ) : (
        <span>
          {props.children}
          <Drawer
            className="manage-video-collection-button__drawer"
            title="Save to:"
            placement={'bottom'}
            closable={true}
            onClose={() => props.onVisibleChange(false)}
            visible={props.isMenuVisible}
            getContainer={props.getPopupContainer}
          >
            {CollectionMenu}
          </Drawer>
        </span>
      )}
    </React.Fragment>
  );
};

export default ManageVideCollectionMenuContainer;
