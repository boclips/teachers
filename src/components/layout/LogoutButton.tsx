import { Dropdown, Menu, Modal } from 'antd';
import { logout } from 'boclips-js-security';
import React, { PureComponent, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import myAccountImg from '../../../resources/images/my-account.svg';
import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';

interface Props {
  mini?: boolean;
}

interface AccountMenuProps {
  onLogout: (SyntheticEvent) => void;
}

const CollectionVideoLink = () => (
  <Link to={'/collections'} data-qa="video-collection">
    My video collections
  </Link>
);

class AccountMenu extends PureComponent<AccountMenuProps> {
  public render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <CollectionVideoLink />
        </Menu.Item>
        <Menu.Item key="1">
          <a
            data-qa="logout-button"
            className="logout"
            onClick={this.props.onLogout}
            href="#"
          >
            Log out
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" href="#" data-qa="account-menu-open">
          <img src={myAccountImg} />
        </a>
      </Dropdown>
    );
  }
}

export class LogoutButton extends PureComponent<Props> {
  public render() {
    return (
      <div className={'logout-container'}>
        <AccountMenu onLogout={this.confirmLogout} />
      </div>
    );
  }

  private confirmLogout(e: SyntheticEvent) {
    e.preventDefault();

    const confirm = Modal.confirm;

    confirm({
      title: 'Are you sure you want to log out?',
      onOk() {
        AnalyticsFactory.getInstance().reset();
        logout({ redirectUri: `${window.location.origin}/bye` });
      },
      okText: 'Log out',
      okButtonProps: {
        size: 'large',
        style: {
          width: '120px',
          marginRight: '4px',
        },
      },
      cancelButtonProps: {
        size: 'large',
        style: {
          width: '120px',
          marginRight: '12px',
        },
      },
      width: '340px',
    });
  }
}
