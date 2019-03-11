import { Drawer, Menu } from 'antd';
import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import collectionsIcon from '../../../../resources/images/collections-grey.svg';
import logooutIcon from '../../../../resources/images/logout.svg';
import myAccountImg from '../../../../resources/images/my-account.svg';
import './AccountMenuMobile.less';

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
        <img
          className="ant-dropdown-link"
          data-qa="account-menu-open"
          onClick={this.showDrawer}
          src={myAccountImg}
        />
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
              <Link
                to={'/collections'}
                data-qa="video-collection"
                onClick={this.onClose}
              >
                <img
                  src={collectionsIcon}
                  className="account-menu-mobile__image"
                />
                My video collections
              </Link>
            </Menu.Item>
            <Menu.Divider key="lovely-divider" />
            <Menu.Item key="2" className="account-menu-mobile__menu-item">
              <a data-qa="logout-button" onClick={this.props.onLogout} href="#">
                <img src={logooutIcon} className="account-menu-mobile__image" />
                Log out
              </a>
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>
    );
  }
}
