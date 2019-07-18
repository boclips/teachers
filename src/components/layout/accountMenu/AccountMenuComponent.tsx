import { Dropdown, Menu } from 'antd';
import React, { SyntheticEvent } from 'react';

import AccountMenuIconComponent from './AccountMenuIconComponent';
import {
  BookmarkedCollectionsLink,
  LogoutLink,
  ReferAFriendLink,
} from './MenuOptions';

interface Props {
  onLogout: (e: SyntheticEvent) => void;
}

const menu = (props: Props) => (
  <Menu className="account-menu account-menu--desktop">
    <Menu.Item key="1">
      <BookmarkedCollectionsLink />
    </Menu.Item>
    <Menu.Item key="2">
      <ReferAFriendLink />
    </Menu.Item>
    <Menu.Item key="3">
      <LogoutLink onClick={props.onLogout} />
    </Menu.Item>
  </Menu>
);

const AccountMenuComponent = React.memo((props: Props) => (
  <div className="display-desktop">
    <Dropdown overlay={menu(props)} trigger={['click']} placement="bottomRight">
      <AccountMenuIconComponent />
    </Dropdown>
  </div>
));

export default AccountMenuComponent;
