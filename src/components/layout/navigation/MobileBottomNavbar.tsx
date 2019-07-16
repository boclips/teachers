import React from 'react';
import './MobileBottomNavbar.less';
import NavbarButtonsContainer from './NavbarButtonsContainer';

const MobileBottomNavbar = React.memo(() => (
  <section className="mobile-bottom-navbar display-mobile">
    <NavbarButtonsContainer />
  </section>
));

export default MobileBottomNavbar;
