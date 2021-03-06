import { Modal } from 'antd';
import BoclipsSecurity from 'boclips-js-security';
import React, { PureComponent, SyntheticEvent } from 'react';
import AccountMenuComponent from './AccountMenuComponent';
import AccountMenuMobile from './AccountMenuMobileComponent';
import QuestionIcon from '../../../../resources/images/question-icon.svg';

import './AccountMenuContainer.less';

export class AccountMenuContainer extends PureComponent {
  private confirmLogout = (e: SyntheticEvent) => {
    e.preventDefault();

    const { confirm } = Modal;

    confirm({
      icon: <QuestionIcon />,
      title: 'Are you sure you want to log out?',
      onOk() {
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
  };

  public render() {
    return (
      <div>
        <AccountMenuComponent onLogout={this.confirmLogout} />
        <AccountMenuMobile onLogout={this.confirmLogout} />
      </div>
    );
  }
}
