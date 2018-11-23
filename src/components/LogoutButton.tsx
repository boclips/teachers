import { Button, Modal } from 'antd';
import { logout } from 'boclips-js-security';
import React, { PureComponent } from 'react';

export class LogoutButton extends PureComponent {
  public render() {
    return (
      <div className="logout-container">
        <Button className="logout" size="large" onClick={this.showConfirm}>
          Log out
        </Button>
      </div>
    );
  }

  private showConfirm() {
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
