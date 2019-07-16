import { Drawer, Menu } from 'antd';
import React, { SyntheticEvent } from 'react';
import AccountMenuIconComponent from './AccountMenuIconComponent';
import './AccountMenuMobileComponent.less';
import {
  BookmarkedCollectionsLink,
  LogoutLink,
  ReferAFriendLink,
} from './MenuOptions';

interface State {
  visible: boolean;
}

interface Props {
  onLogout: (e: SyntheticEvent) => void;
}

export default class AccountMenuMobile extends React.PureComponent<
  Props,
  State
  > {
  constructor(props: any) {
    super(props);

    this.state = { visible: false };
  }

  private showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  private onClose = () => {
    this.setState({
      visible: false,
    });
  };

  public render() {
    return (
      <div className="display-mobile">
        <AccountMenuIconComponent onClick={this.showDrawer} />
        <Drawer
          className="account-menu account-menu-mobile__drawer"
          visible={this.state.visible}
          placement="bottom"
          title="My account"
          onClose={this.onClose}
        >
          <Menu selectable={false}>
            <Menu.Divider key="lovely-divider-1" />
            <Menu.Item key="1" className="account-menu-mobile__menu-item">
              <BookmarkedCollectionsLink onClick={this.onClose} />
            </Menu.Item>
            <Menu.Divider key="lovely-divider-2" />
            <Menu.Item key="2" className="account-menu-mobile__menu-item">
              <ReferAFriendLink />
            </Menu.Item>
            <Menu.Divider key="lovely-divider-3" />
            <Menu.Item key="3" className="account-menu-mobile__menu-item">
              <LogoutLink onClick={this.props.onLogout} />
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>
    );
  }
}
