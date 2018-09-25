import { Location, LocationDescriptorObject } from 'history';
import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LocationState, RouterState, UserState } from '../State';

interface OwnProps {
  children: ReactNode;
}

interface StateProps {
  authorized: boolean;
  location: Location;
}

class LoginRequired extends React.Component<OwnProps & StateProps> {
  public render() {
    if (this.props.authorized) {
      return this.props.children;
    }

    return this.redirect();
  }

  private redirect() {
    const redirectTo: LocationDescriptorObject<LocationState> = {
      pathname: '/login',
      state: {
        from: this.props.location,
      },
    };
    return <Redirect to={redirectTo} />;
  }
}

function mapStateToProps(state: RouterState & UserState): StateProps {
  return {
    authorized: state.user && state.user.valid,
    location: state.router.location,
  };
}

export default connect(mapStateToProps)(LoginRequired);
