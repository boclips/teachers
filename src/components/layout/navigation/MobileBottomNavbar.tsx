import { Layout } from 'antd';
import React from 'react';
import './MobileBottomNavbar.less';
import NavbarButtonsContainer from './NavbarButtonsContainer';

const { Content } = Layout;

const MobileBottomNavbar = React.memo(() => (
  <section className="mobile-bottom-navbar display-mobile">
    <Content>
      <NavbarButtonsContainer />
    </Content>
  </section>
));

export default MobileBottomNavbar;
