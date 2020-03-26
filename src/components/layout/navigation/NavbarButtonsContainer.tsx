import React from 'react';
import { HelpMenu } from 'src/components/layout/navigation/HelpMenu';
import { AccountMenuContainer } from '../accountMenu/AccountMenuContainer';
import { HomeLink, SubjectsLink } from '../navigation/NavbarButtons';
import SubjectMenuComponent from '../subjectsMenu/SubjectMenuComponent';
import './NavbarButtons.less';

export const NavbarButtonsContainer = React.memo(() => (
  <ul className={'navbar-buttons'}>
    <li className={'navbar-buttons__list-item display-mobile-and-tablet'}>
      <HomeLink />
    </li>
    <li className={'navbar-buttons__list-item display-desktop'}>
      <AccountMenuContainer />
    </li>
    <li className={'navbar-buttons__list-item display-desktop'}>
      <SubjectMenuComponent />
    </li>
    <li className={'navbar-buttons__list-item display-desktop'}>
      <HelpMenu />
    </li>
    <li className={'navbar-buttons__list-item display-mobile-and-tablet'}>
      <SubjectsLink />
    </li>
  </ul>
));
