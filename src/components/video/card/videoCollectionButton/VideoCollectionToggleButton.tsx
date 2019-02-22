import { Button, Checkbox, Drawer, Dropdown, Menu } from 'antd';
import React from 'react';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';

interface Props {
  video: Video;
  collections: VideoCollection[];
  onAdd: (collection: VideoCollection) => () => void;
  onRemove: (collection: VideoCollection) => () => void;
}

interface State {
  drawerVisible: boolean;
}

export default class VideoCollectionToggleButton extends React.PureComponent<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      drawerVisible: false,
    };
  }

  public render() {
    return (
      <span>
        <span className="display-tablet-and-desktop">
          <Dropdown overlay={this.menu()} trigger={['click']}>
            {this.saveButton()}
          </Dropdown>
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
        My Video Collection
      </Checkbox>
    );
  }

  private menu() {
    return (
      <Menu>
        {this.props.collections.map(collection => (
          <Menu.Item>
            {this.collectionItem(collection, this.props.video)}
          </Menu.Item>
        ))}
      </Menu>
    );
  }

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
      this.props.onRemove(collection)();
    } else {
      this.props.onAdd(collection)();
    }
  };

  private showDrawer = () => {
    this.setState({
      drawerVisible: true,
    });
  };

  private onClose = () => {
    this.setState({
      drawerVisible: false,
    });
  };
}
