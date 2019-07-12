import React from 'react'
import NavbarButtonsContainer from "./NavbarButtonsContainer";
import './MobileBottomNavbar.less'
import { Layout } from 'antd';

const { Content } = Layout;

const MobileBottomNavbar = React.memo(() => (
  <section className="mobile-bottom-navbar display-mobile" >
    <Content>
      <NavbarButtonsContainer />
    </Content>
  </section>)
)

export default MobileBottomNavbar;