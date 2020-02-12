import { Dropdown, Menu } from 'antd';
import React, { SyntheticEvent } from 'react';
import MyAccountSVG from '../../../../resources/images/my-account.svg';
import DropdownMenuIconComponent from '../navigation/DropdownMenuIconComponent';
import {
  AccountSettingsLink,
  LogoutLink,
  UserCollectionsLink,
} from './MenuOptions';

interface Props {
  onLogout: (e: SyntheticEvent) => void;
}

interface State {
  visible: boolean;
}
class AccountMenuComponent extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  private setVisible = visible => {
    this.setState({ visible });
  };

  private renderMenu = (): React.ReactFragment => (
    <Menu className="account-menu account-menu--desktop">
      <Menu.Item key="1">
        <UserCollectionsLink />
      </Menu.Item>
      <Menu.Item key="2">
        <AccountSettingsLink />
      </Menu.Item>
      <Menu.Item key="3">
        <LogoutLink onClick={this.props.onLogout} />
      </Menu.Item>
    </Menu>
  );

  public render() {
    return (
      <div className="display-desktop">
        <Dropdown
          overlay={this.renderMenu}
          trigger={['click']}
          placement="bottomRight"
          onVisibleChange={this.setVisible}
        >
          <DropdownMenuIconComponent
            dataQa={'account-menu-open'}
            active={this.state.visible}
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
    );
  }
}
export default AccountMenuComponent;
