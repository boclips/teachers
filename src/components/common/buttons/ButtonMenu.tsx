import { Button, Dropdown, Icon, Menu } from 'antd';
import React from 'react';
import MoreSVG from '../../../../resources/images/more.svg';

import './ButtonMenu.less';

interface Props {
  buttons: React.ReactNode[];
}

export class ButtonMenu extends React.PureComponent<Props> {
  public render() {
    if (this.props.buttons.length === 1) {
      return <section className="button-menu">{this.props.buttons[0]}</section>;
    }

    const menu = () => (
      <Menu className="button-row__container">
        {this.props.buttons.map((button, index) => (
          <Menu.Item key={index}>{button}</Menu.Item>
        ))}
      </Menu>
    );

    return (
      <section className="button-menu">
        <Dropdown overlay={menu()} placement="bottomRight" trigger={['click']}>
          <Button className="button-menu__expand">
            <Icon component={MoreSVG} />
          </Button>
        </Dropdown>
      </section>
    );
  }
}
