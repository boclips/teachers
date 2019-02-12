import { Button, Checkbox, Dropdown, Menu } from 'antd';
import React from 'react';
import savedImg from '../../../../../resources/images/saved.svg';

interface Props {
  isInDefaultCollection: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

export default class VideoCollectionToggleButton extends React.PureComponent<
  Props
> {
  public render() {
    return (
      <Dropdown overlay={this.menu()} trigger={['click']}>
        <Button
          className="toggle-collection-button"
          data-qa={'video-collection-menu'}
          size={'large'}
        >
          {this.content()}
        </Button>
      </Dropdown>
    );
  }

  private menu() {
    return (
      <Menu>
        <Menu.Item>
          <Checkbox
            defaultChecked={this.props.isInDefaultCollection}
            data-qa={this.dataQa()}
            onChange={this.onClick}
          >
            My Video Collection
          </Checkbox>
        </Menu.Item>
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
    if (this.props.isInDefaultCollection) {
      this.props.onRemove();
    } else {
      this.props.onAdd();
    }
  };
}
