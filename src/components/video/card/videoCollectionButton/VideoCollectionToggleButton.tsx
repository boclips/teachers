import { Button, Checkbox, Drawer, Dropdown, Menu } from 'antd';
import React from 'react';
import savedImg from '../../../../../resources/images/saved.svg';

interface Props {
  isInDefaultCollection: boolean;
  onAdd: () => void;
  onRemove: () => void;
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
            {this.collectionItem()}
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
        {this.content()}
      </Button>
    );
  }

  private collectionItem() {
    return (
      <Checkbox
        defaultChecked={this.props.isInDefaultCollection}
        data-qa={this.dataQa()}
        onChange={this.onClick}
      >
        My Video Collection
      </Checkbox>
    );
  }

  private menu() {
    return (
      <Menu>
        <Menu.Item>{this.collectionItem()}</Menu.Item>
      </Menu>
    );
  }

  private content() {
    if (this.props.isInDefaultCollection) {
      return (
        <span>
          <img src={savedImg} alt="" />
          Saved
        </span>
      );
    } else {
      return <span>Save</span>;
    }
  }

  private dataQa() {
    if (this.props.isInDefaultCollection) {
      return 'remove-from-default-collection';
    } else {
      return 'add-to-default-collection';
    }
  }

  private onClick = () => {
    this.onClose();

    if (this.props.isInDefaultCollection) {
      this.props.onRemove();
    } else {
      this.props.onAdd();
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
