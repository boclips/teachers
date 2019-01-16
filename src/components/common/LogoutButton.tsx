import { Button, Modal } from 'antd';
import { logout } from 'boclips-js-security';
import React, { PureComponent } from 'react';

interface Props {
  mini?: boolean;
}

export class LogoutButton extends PureComponent<Props> {
  public render() {
    const containerClass = this.props.mini
      ? 'logout-container-mini'
      : 'logout-container';
    return (
      <div className={containerClass}>
        {!this.props.mini && (
          <Button
            data-qa="logout-button"
            className="logout"
            size="large"
            onClick={this.showConfirm}
          >
            Log out
          </Button>
        )}
        {this.props.mini && <a onClick={this.showConfirm}>Log out</a>}
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
