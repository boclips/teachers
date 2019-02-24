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
  drawerVisible: boolean;
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
      drawerVisible: false,
      createCollectionVisible: false,
    };
  }
  public render() {
    return (
      <span>
        <span className="display-tablet-and-desktop">
          <Popover
            overlayClassName="manage-video-collection-button__popover"
            autoAdjustOverflow={false}
            content={this.menu()}
            placement="bottom"
            trigger="click"
            onVisibleChange={this.onDropdownToggle}
          >
            {this.saveButton()}
          </Popover>
        </span>
        <span className="display-mobile">
          {this.saveButton(this.showDrawer)}
          <Drawer
            title="Select collection"
            placement={'bottom'}
            closable={true}
            onClose={this.onClose}
            visible={this.state.drawerVisible}
          >
            {this.props.collections.map(collection =>
              this.collectionItem(collection, this.props.video),
            )}
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
    const menuEntries = this.props.collections.map(collection => (
      <Menu.Item
        key={collection.id}
        className="manage-video-collection-button__menu-item"
      >
        {this.collectionItem(collection, this.props.video)}
      </Menu.Item>
    ));
    if (menuEntries.length) {
      menuEntries.push(<Menu.Divider />);
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
            onClick={this.showCreateCollection}
          >
            <Icon type="plus" />
            New video collection
          </section>
        )}
      </Menu.Item>,
    );
    return <Menu>{menuEntries}</Menu>;
  }

  private onDropdownToggle = (visible: boolean) => {
    if (!visible) {
      this.setState({
        ...this.state,
        drawerVisible: false,
        createCollectionVisible: false,
        newCollectionTitle: undefined,
      });
    }
  };

  private setTitle = e => {
    this.setState({ ...this.state, newCollectionTitle: e.target.value });
  };

  private dataQa(alreadyInCollection: boolean) {
    if (alreadyInCollection) {
      return 'remove-from-collection';
    } else {
      return 'add-to-default-collection';
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
      drawerVisible: true,
    });
  };

  private createCollection = () => {
    this.props.onCreateCollection({
      title: this.state.newCollectionTitle,
      videos: [this.props.video],
    });
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
      drawerVisible: false,
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
  return {
    collections: collections.items,
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ManageVideoCollectionsButton);
