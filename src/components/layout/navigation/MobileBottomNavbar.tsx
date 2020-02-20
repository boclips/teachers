import React from 'react';
import { connect } from 'react-redux';
import { UserState } from '../../../types/State';
import './MobileBottomNavbar.less';
import { NavbarButtonsContainer } from './NavbarButtonsContainer';

interface StateProps {
  authorized: boolean;
}

class MobileBottomNavbarComponent extends React.PureComponent<StateProps> {
  public render() {
    return (
      this.props.authorized && (
        <section className="mobile-bottom-navbar display-mobile-and-tablet">
          <NavbarButtonsContainer />
        </section>
      )
    );
  }
}

function mapStateToProps(state: UserState): StateProps {
  return {
    authorized: !!state.user,
  };
}

export const MobileBottomNavbar = connect(mapStateToProps)(
  MobileBottomNavbarComponent,
);
