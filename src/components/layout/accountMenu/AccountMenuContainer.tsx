import { Modal } from 'antd';
import { logout } from 'boclips-js-security';
import React, { PureComponent, SyntheticEvent } from 'react';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import AccountMenuComponent from './AccountMenuComponent';
import AccountMenuMobile from './AccountMenuMobileComponent';

export class AccountMenuContainer extends PureComponent {
  public render() {
    return (
      <div className={'logout-container'}>
        <AccountMenuComponent onLogout={this.confirmLogout} />
        <AccountMenuMobile onLogout={this.confirmLogout} />
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