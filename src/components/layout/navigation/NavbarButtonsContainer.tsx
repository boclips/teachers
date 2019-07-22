import React from 'react';
import { AccountMenuContainer } from '../accountMenu/AccountMenuContainer';
import { HomeLink, PublicCollectionsLink } from '../navigation/NavbarButtons';
import SubjectMenuComponent from '../subjectsMenu/SubjectMenuComponent';
import './NavbarButtons.less';

const NavbarButtonsContainer = React.memo(() => (
  <ul className={'navbar-buttons'}>
    <li className={'navbar-buttons__list-item display-mobile-and-tablet'}>
      <HomeLink />
    </li>
    <li className={'navbar-buttons__list-item'}>
      <SubjectMenuComponent />
    </li>
    <li className={'navbar-buttons__list-item'}>
      <PublicCollectionsLink />
    </li>
    <li className={'navbar-buttons__list-item display-desktop'}>
      <AccountMenuContainer />
    </li>
  </ul>
));

export default NavbarButtonsContainer;
