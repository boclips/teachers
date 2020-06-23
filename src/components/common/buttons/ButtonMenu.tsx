import Icon from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import classnames from 'classnames';
import React from 'react';
import MoreSVG from '../../../../resources/images/more.svg';

import './ButtonMenu.less';

interface Props {
  className?: string;
  buttons: React.ReactNode[];
}

export class ButtonMenu extends React.PureComponent<Props> {
  public render() {
    if (this.props.buttons.length === 1) {
      return (
        <section className={classnames('button-menu', this.props.className)}>
          {this.props.buttons[0]}
        </section>
      );
    }

    const menu = () => (
      <Menu className="button-row__container">
        {this.props.buttons.map(
          (button, index) =>
            button && <Menu.Item key={index}>{button}</Menu.Item>,
        )}
      </Menu>
    );

    return (
      <section className={classnames('button-menu', this.props.className)}>
        <Dropdown
          overlayClassName="button-menu__dropdown"
          overlay={menu()}
          placement="bottomRight"
          trigger={['click']}
        >
          <Button className="button-menu__expand" data-qa="open-button-menu">
            <Icon component={MoreSVG} />
          </Button>
        </Dropdown>
      </section>
    );
  }
}
