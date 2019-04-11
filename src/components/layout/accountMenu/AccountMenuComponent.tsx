import { Dropdown, Menu } from 'antd';
import React, { SyntheticEvent } from 'react';
import AccountMenuIconComponent from './AccountMenuIconComponent';
import {
  BookmarkedCollectionsLink,
  LogoutLink,
  VideoCollectionsLink,
} from './MenuOptions';

interface Props {
  onLogout: (e: SyntheticEvent) => void;
}

const menu = (props: Props) => (
  <Menu className="account-menu">
    <Menu.Item key="1">
      <VideoCollectionsLink />
    </Menu.Item>
    <Menu.Item key="2">
      <BookmarkedCollectionsLink />
    </Menu.Item>
    <Menu.Item key="3">
      <LogoutLink onClick={props.onLogout} />
    </Menu.Item>
  </Menu>
);

const AccountMenuComponent = React.memo((props: Props) => (
  <div className="display-tablet-and-desktop">
    <Dropdown overlay={menu(props)} trigger={['click']}>
      <AccountMenuIconComponent />
    </Dropdown>
  </div>
));

export default AccountMenuComponent;
