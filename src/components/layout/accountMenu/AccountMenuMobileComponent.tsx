import { Drawer, Menu } from 'antd';
import React, { SyntheticEvent } from 'react';
import collectionsIcon from '../../../../resources/images/collections-grey.svg';
import logooutIcon from '../../../../resources/images/logout.svg';
import AccountMenuIconComponent from './AccountMenuIconComponent';
import './AccountMenuMobile.less';
import { LogoutLink, VideoCollectionsLink } from './MenuOptions';

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
      <div className="display-mobile">
        <AccountMenuIconComponent onClick={this.showDrawer} />
        <Drawer
          className="account-menu-mobile__drawer"
          visible={this.state.visible}
          placement="bottom"
          title="My account"
          onClose={this.onClose}
          height="142"
        >
          <Menu selectable={false}>
            <Menu.Item key="1" className="account-menu-mobile__menu-item">
              <VideoCollectionsLink
                logo={
                  <img
                    src={collectionsIcon}
                    className="account-menu-mobile__image"
                  />
                }
                onClick={this.onClose}
              />
            </Menu.Item>
            <Menu.Divider key="lovely-divider" />
            <Menu.Item key="2" className="account-menu-mobile__menu-item">
              <LogoutLink
                logo={
                  <img
                    src={logooutIcon}
                    className="account-menu-mobile__image"
                  />
                }
                onClick={this.props.onLogout}
              />
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>
    );
  }
}
