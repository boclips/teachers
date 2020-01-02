import { Button, Checkbox, Drawer, Icon, Input, Menu, Popover } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import SaveSVG from '../../../../../resources/images/save.svg';
import AddSVG from '../../../../../resources/images/add.svg';
import { CreateCollectionRequest } from '../../../../services/collections/createCollection';
import State from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import { addVideoToMyCollectionAction } from '../../../collection/redux/actions/addToMyCollectionAction';
import { createCollectionAction } from '../../../collection/redux/actions/createCollectionAction';
import { removeVideoFromMyCollectionAction } from '../../../collection/redux/actions/removeFromMyCollectionAction';
import withPageableCollection, {
  WithPageableCollectionProps,
} from '../../../common/higerOrderComponents/withPageableCollection';
import SavingButton from '../../../common/savingButton/SavingButton';
import './ManageVideoCollectionButton.less';

interface StateProps {
  updating: boolean;
  canFetchMyCollections: boolean;
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
  isSaving: boolean;
}

class ManageVideoCollectionsButton extends React.PureComponent<
  StateProps & OwnProps & DispatchProps & WithPageableCollectionProps,
  InternalState
> {
  public constructor(
    props: StateProps & OwnProps & DispatchProps & WithPageableCollectionProps,
  ) {
    super(props);

    this.state = {
      isSaving: false,
      collectionDrawerVisible: false,
      collectionPopoverVisible: false,
      createCollectionVisible: false,
    };
  }

  public static getDerivedStateFromProps(
    props: StateProps,
    state: InternalState,
  ): InternalState {
    return { ...state, isSaving: !props.updating ? false : state.isSaving };
  }

  public render() {
    if (!this.props.canFetchMyCollections) {
      return null;
    }

    return (
      <React.Fragment>
        <span className="display-tablet-and-desktop">
          <Popover
            title={this.props.loading ? 'Loading collections...' : 'Save to:'}
            overlayClassName="manage-video-collection-button__popover"
            autoAdjustOverflow={false}
            content={this.menu()}
            placement="bottomLeft"
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
            onClose={this.onClose()}
            visible={this.state.collectionDrawerVisible}
          >
            {this.menu()}
          </Drawer>
        </span>
      </React.Fragment>
    );
  }

  private saveButton(onClick?: () => void) {
    return (
      <SavingButton
        saving={this.state.isSaving}
        data-qa={'video-collection-menu'}
        size={'large'}
        onClick={onClick}
      >
        <Icon component={SaveSVG} /> <span>Save</span>
      </SavingButton>
    );
  }

  private collectionItem(videoCollection: VideoCollection, video: Video) {
    const alreadyInCollection =
      videoCollection.videoIds.find(v => v.value === video.id) !== undefined;
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

    const menuEntries = (this.props.collections || []).map(collection => (
      <Menu.Item
        key={collection.id}
        className="manage-video-collection-button__menu-item"
      >
        {this.collectionItem(collection, this.props.video)}
      </Menu.Item>
    ));

    return (
      <React.Fragment>
        <InfiniteScroll
          dataLength={this.props.collections.length}
          next={this.props.fetchNextPage}
          hasMore={this.props.hasMoreCollections}
          scrollThreshold={0.3}
          hasChildren={this.props.collections.length > 0}
          loader=""
          scrollableTarget="videoCollectionButtonScroll"
        >
          <Menu
            id="videoCollectionButtonScroll"
            className="manage-video-collection-button__menu-container"
          >
            {menuEntries}
          </Menu>
        </InfiniteScroll>
        <div
          className="manage-video-collection-button__create-collection-container"
          key="option-create-collection"
          onClick={this.preventDefault}
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
              <span
                className={
                  'manage-video-collection-button__create-collection-icon'
                }
              >
                <Icon component={AddSVG} />
              </span>

              <span>New video collection</span>
            </section>
          )}
        </div>
      </React.Fragment>
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
    this.onClose({ isSaving: true })();

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
    this.onClose({ isSaving: true })();
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

  private onClose = (newState?: Partial<InternalState>) => () => {
    this.setState({
      ...this.state,
      ...newState,
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
      dispatch(
        addVideoToMyCollectionAction({ video: props.video, collection }),
      ),
    onRemoveFromCollection: (collection: VideoCollection) =>
      dispatch(
        removeVideoFromMyCollectionAction({ video: props.video, collection }),
      ),
    onCreateCollection: (request: CreateCollectionRequest) =>
      dispatch(createCollectionAction(request)),
  };
}

function mapStateToProps({ collections, links }: State): StateProps {
  return {
    updating: collections.updating,
    canFetchMyCollections: links.myCollections && true,
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withPageableCollection<OwnProps>(ManageVideoCollectionsButton));
