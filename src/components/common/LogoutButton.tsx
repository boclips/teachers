import { Dropdown, Menu, Modal } from 'antd';
import { logout } from 'boclips-js-security';
import React, { PureComponent, SyntheticEvent } from 'react';
import myAccountImg from '../../../resources/images/my-account.svg';

interface Props {
  mini?: boolean;
}

interface AccountMenuProps {
  onLogout: (SyntheticEvent) => void;
}

class AccountMenu extends PureComponent<AccountMenuProps> {
  public render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
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
    const containerClass = this.props.mini
      ? 'logout-container-mini'
      : 'logout-container';
    return (
      <div className={containerClass}>
        {!this.props.mini && <AccountMenu onLogout={this.confirmLogout} />}
        {this.props.mini && <a onClick={this.confirmLogout}>Log out</a>}
      </div>
    );
  }

  private confirmLogout(e: SyntheticEvent) {
    e.preventDefault();

    const confirm = Modal.confirm;

    confirm({
      title: 'Are you sure you want to log out?',
      onOk() {
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
