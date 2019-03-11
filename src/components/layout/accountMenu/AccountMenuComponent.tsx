import { Dropdown, Menu } from 'antd';
import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import myAccountImg from '../../../../resources/images/my-account.svg';

interface Props {
  onLogout: (e: SyntheticEvent) => void;
}

const menu = (props: Props) => (
  <Menu>
    <Menu.Item key="1">
      <Link to={'/collections'} data-qa="video-collection">
        My video collections
      </Link>
    </Menu.Item>
    <Menu.Item key="2">
      <a
        data-qa="logout-button"
        className="logout"
        onClick={props.onLogout}
        href="#"
      >
        Log out
      </a>
    </Menu.Item>
  </Menu>
);

const AccountMenuComponent = React.memo((props: Props) => (
  <div className="display-tablet-and-desktop">
    <Dropdown overlay={menu(props)} trigger={['click']}>
      <a className="ant-dropdown-link" href="#" data-qa="account-menu-open">
        <img src={myAccountImg} />
      </a>
    </Dropdown>
  </div>
));

export default AccountMenuComponent;
