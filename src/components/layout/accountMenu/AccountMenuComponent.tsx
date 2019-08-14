import { Dropdown, Menu } from 'antd';
import React, { SyntheticEvent } from 'react';
import MyAccountSVG from '../../../../resources/images/my-account.svg';
import DropdownMenuIconComponent from '../navigation/DropdownMenuIconComponent';
import {
  BookmarkedCollectionsLink,
  LogoutLink,
  ReferAFriendLink,
  UserCollectionsLink,
} from './MenuOptions';

interface Props {
  onLogout: (e: SyntheticEvent) => void;
}

const menu = (props: Props) => (
  <Menu className="account-menu account-menu--desktop">
    <Menu.Item key="1">
      <UserCollectionsLink />
    </Menu.Item>
    <Menu.Item key="2">
      <BookmarkedCollectionsLink />
    </Menu.Item>
    <Menu.Item key="3">
      <ReferAFriendLink />
    </Menu.Item>
    <Menu.Item key="4">
      <LogoutLink onClick={props.onLogout} />
    </Menu.Item>
  </Menu>
);

const AccountMenuComponent = React.memo((props: Props) => (
  <div className="display-desktop">
    <Dropdown
      overlay={menu(props)}
      trigger={['hover', 'click']}
      placement="bottomRight"
    >
      <DropdownMenuIconComponent
        dataQa={'account-menu-open'}
        icon={
          <MyAccountSVG
            className="account-menu-icon ant-dropdown-link"
            tabIndex={0}
            aria-haspopup="true"
            aria-hidden="true"
          />
        }
        label={'Your account'}
      />
    </Dropdown>
  </div>
));

export default AccountMenuComponent;
