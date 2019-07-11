import React from 'react';
import { AccountMenuContainer } from '../accountMenu/AccountMenuContainer';
import {
  MyCollectionsLink,
  PublicCollectionsLink,
} from '../accountMenu/MenuOptions';
import './NavBarButtons.less';

export class NavBarButtonsContainer extends React.Component {
  public render() {
    return (
      <ul className={'navbar-buttons'}>
        <li>
          <MyCollectionsLink />
        </li>
        <li>
          <AccountMenuContainer />
        </li>
        <li>
          <PublicCollectionsLink />
        </li>
      </ul>
    );
  }
}
