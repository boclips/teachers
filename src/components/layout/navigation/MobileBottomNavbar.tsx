import React from 'react';
import { connect } from 'react-redux';
import { UserState } from 'src/types/State';
import { NavbarButtonsContainer } from './NavbarButtonsContainer';
import './MobileBottomNavbar.less';

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
