import { Drawer, Menu } from 'antd';
import React, { SyntheticEvent } from 'react';
import MyAccountSVG from '../../../../resources/images/my-account.svg';
import DropdownMenuIconComponent from '../navigation/DropdownMenuIconComponent';
import './AccountMenuMobileComponent.less';
import {
  BookmarkedCollectionsLink,
  LogoutLink,
  UserCollectionsLink,
} from './MenuOptions';

interface State {
  visible: boolean;
}

interface Props {
  onLogout: (e: SyntheticEvent) => void;
}

export default class AccountMenuMobile extends React.PureComponent<
  Props,
  State
> {
  constructor(props: any) {
    super(props);

    this.state = { visible: false };
  }

  private showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  private onClose = () => {
    this.setState({
      visible: false,
    });
  };

  public render() {
    return (
      <div className="display-mobile-and-tablet">
        <DropdownMenuIconComponent
          onClick={this.showDrawer}
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
        <Drawer
          className="account-menu account-menu-mobile__drawer"
          visible={this.state.visible}
          placement="bottom"
          title="My account"
          onClose={this.onClose}
        >
          <Menu selectable={false}>
            <Menu.Divider key="lovely-divider-1" />
            <Menu.Item key="1" className="account-menu-mobile__menu-item">
              <UserCollectionsLink onClick={this.onClose} />
            </Menu.Item>
            <Menu.Divider key="lovely-divider-2" />
            <Menu.Item key="2" className="account-menu-mobile__menu-item">
              <BookmarkedCollectionsLink onClick={this.onClose} />
            </Menu.Item>
            <Menu.Divider key="lovely-divider-3" />
            <Menu.Divider key="lovely-divider-4" />
            <Menu.Item key="4" className="account-menu-mobile__menu-item">
              <LogoutLink onClick={this.props.onLogout} />
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>
    );
  }
}
