import React from 'react';
import { AccountMenuContainer } from '../accountMenu/AccountMenuContainer';
import {
  HomeLink,
  MyCollectionsLink,
  PublicCollectionsLink,
} from '../navigation/NavbarButtons';
import './NavbarButtons.less';

const NavbarButtonsContainer = React.memo(() => (
  <ul className={'navbar-buttons'}>
    <li className={'navbar-buttons__list-item display-mobile-and-tablet'}>
      <HomeLink />
    </li>
    <li className={'navbar-buttons__list-item'}>
      <MyCollectionsLink />
    </li>
    <li className={'navbar-buttons__list-item display-desktop'}>
      <AccountMenuContainer />
    </li>
    <li className={'navbar-buttons__list-item'}>
      <PublicCollectionsLink />
    </li>
  </ul>
));

export default NavbarButtonsContainer;
