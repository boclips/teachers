import { Button, Checkbox, Drawer, Icon, Input, Menu, Popover } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CreateCollectionRequest } from '../../../../services/collections/createCollection';
import State from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import { addToCollectionAction } from '../../../collection/redux/actions/addToCollectionAction';
import { createCollectionAction } from '../../../collection/redux/actions/createCollectionAction';
import { removeFromCollectionAction } from '../../../collection/redux/actions/removeFromCollectionAction';
import './manage-video-collection-button.less';

interface StateProps {
  collections: VideoCollection[];
  loading: boolean;
}

export interface OwnProps {
  video: Video;
}

interface DispatchProps {
  onAddToCollection: (collection: VideoCollection) => {};
  onRemoveFromCollection: (collection: VideoCollection) => {};
  onCreateCollection: (request: CreateCollectionRequest) => {};
}

interface InternalState {
  collectionDrawerVisible: boolean;
  collectionPopoverVisible: boolean;
  createCollectionVisible: boolean;
  newCollectionTitle?: string;
}

class ManageVideoCollectionsButton extends React.PureComponent<
  StateProps & OwnProps & DispatchProps,
  InternalState
> {
  constructor(props: StateProps & OwnProps & DispatchProps) {
    super(props);

    this.state = {
      collectionDrawerVisible: false,
      collectionPopoverVisible: false,
      createCollectionVisible: false,
    };
  }
  public render() {
    return (
      <span>
        <span className="display-tablet-and-desktop">
          <Popover
            title={this.props.loading ? 'Loading collections...' : 'Save to:'}
            overlayClassName="manage-video-collection-button__popover"
            autoAdjustOverflow={false}
            content={this.menu()}
            placement="bottom"
            trigger="click"
            onVisibleChange={this.onPopoverToggle}
            visible={this.state.collectionPopoverVisible}
          >
            {this.saveButton(this.showPopover)}
          </Popover>
        </span>
        <span className="display-mobile">
          {this.saveButton(this.showDrawer)}
          <Drawer
            className="manage-video-collection-button__drawer"
            title="Save to:"
            placement={'bottom'}
            closable={true}
            onClose={this.onClose}
            visible={this.state.collectionDrawerVisible}
          >
            {this.menu()}
          </Drawer>
        </span>
      </span>
    );
  }

  private saveButton(onClick?: () => void) {
    return (
      <Button
        className="toggle-collection-button"
        data-qa={'video-collection-menu'}
        size={'large'}
        onClick={onClick}
      >
        Save
      </Button>
    );
  }

  private collectionItem(videoCollection: VideoCollection, video: Video) {
    const alreadyInCollection =
      videoCollection.videos.find(v => v.id === video.id) !== undefined;
    return (
      <Checkbox
        defaultChecked={alreadyInCollection}
        data-qa={this.dataQa(alreadyInCollection)}
        data-state={videoCollection.title}
        onChange={this.onClick(alreadyInCollection, videoCollection)}
      >
        <span className="manage-video-collection-button__collection-entry">
          {videoCollection.title}
        </span>
      </Checkbox>
    );
  }

  private preventDefault(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
  }

  private menu() {
    if (this.props.loading) {
      return (
        <section
          data-qa="loading-collections"
          className="manage-video-collection-button__loading-collections"
        >
          <Icon type="loading" />
        </section>
      );
    }
    const menuEntries = this.props.collections.map(collection => (
      <Menu.Item
        key={collection.id}
        className="manage-video-collection-button__menu-item"
      >
        {this.collectionItem(collection, this.props.video)}
      </Menu.Item>
    ));
    if (menuEntries.length) {
      menuEntries.push(<Menu.Divider key="lovely-divider" />);
    }
    menuEntries.push(
      <Menu.Item
        key="option-create-collection"
        onClick={this.preventDefault}
        disabled={this.state.createCollectionVisible}
      >
        {this.state.createCollectionVisible ? (
          <section>
            <Input
              className="manage-video-collection-button__title-input"
              type="text"
              placeholder="Enter collection name"
              onChange={this.setTitle}
              data-qa="new-collection-title"
              onPressEnter={this.createCollection}
            />
            <Button
              htmlType="button"
              className="manage-video-collection-button__create-collection-button"
              type="primary"
              data-qa="create-collection-button"
              onClick={this.createCollection}
            >
              Create
            </Button>
          </section>
        ) : (
          <section
            data-qa="create-collection"
            className="manage-video-collection-button__create-collection"
            onClick={this.showCreateCollection}
          >
            <Icon type="plus" />
            New video collection
          </section>
        )}
      </Menu.Item>,
    );
    return (
      <Menu className="manage-video-collection-button__menu-container">
        {menuEntries}
      </Menu>
    );
  }

  private onPopoverToggle = (visible: boolean) => {
    this.setState({
      ...this.state,
      collectionPopoverVisible: visible,
      createCollectionVisible: false,
      newCollectionTitle: undefined,
    });
  };

  private setTitle = e => {
    this.setState({ ...this.state, newCollectionTitle: e.target.value });
  };

  private dataQa(alreadyInCollection: boolean) {
    if (alreadyInCollection) {
      return 'remove-from-collection';
    } else {
      return 'add-to-collection';
    }
  }

  private onClick = (
    alreadyInCollection: boolean,
    collection: VideoCollection,
  ) => () => {
    this.onClose();

    if (alreadyInCollection) {
      this.props.onRemoveFromCollection(collection);
    } else {
      this.props.onAddToCollection(collection);
    }
  };

  private showDrawer = () => {
    this.setState({
      ...this.state,
      collectionDrawerVisible: true,
    });
  };

  private showPopover = () => {
    this.setState({
      ...this.state,
      collectionPopoverVisible: true,
    });
  };

  private createCollection = () => {
    this.props.onCreateCollection({
      title: this.state.newCollectionTitle,
      videos: [this.props.video],
    });
    this.onClose();
  };

  private showCreateCollection = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      createCollectionVisible: true,
    });
  };

  private onClose = () => {
    this.setState({
      ...this.state,
      collectionPopoverVisible: false,
      collectionDrawerVisible: false,
      createCollectionVisible: false,
      newCollectionTitle: undefined,
    });
  };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  props: OwnProps,
): DispatchProps {
  return {
    onAddToCollection: (collection: VideoCollection) =>
      dispatch(addToCollectionAction({ video: props.video, collection })),
    onRemoveFromCollection: (collection: VideoCollection) =>
      dispatch(removeFromCollectionAction({ video: props.video, collection })),
    onCreateCollection: (request: CreateCollectionRequest) =>
      dispatch(createCollectionAction(request)),
  };
}

function mapStateToProps({ collections }: State): StateProps {
  return { collections: collections.items, loading: collections.loading };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ManageVideoCollectionsButton);
