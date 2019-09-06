import { Modal } from 'antd';
import BoclipsSecurity from 'boclips-js-security';
import React, { PureComponent, SyntheticEvent } from 'react';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import AccountMenuComponent from './AccountMenuComponent';
import AccountMenuMobile from './AccountMenuMobileComponent';

import './AccountMenuContainer.less';

export class AccountMenuContainer extends PureComponent {
  public render() {
    return (
      <div>
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
        AnalyticsFactory.mixpanel().reset();
        BoclipsSecurity.getInstance().logout({
          redirectUri: `${window.location.origin}/bye`,
        });
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
