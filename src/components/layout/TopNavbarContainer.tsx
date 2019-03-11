import React from 'react';
import { connect } from 'react-redux';
import { LoginState } from '../../types/State';
import TopNavbarComponent from './TopNavbarComponent';

interface Props {
  showTabs?: boolean;
  showSearchBar?: boolean;
}

interface StateProps {
  authorized: boolean;
}

class TopNavbarContainer extends React.PureComponent<Props & StateProps> {
  public static defaultProps = {
    showTabs: false,
    showSearchBar: true,
  };

  public render() {
    return (
      <TopNavbarComponent
        showTabs={this.props.showTabs}
        authorized={this.props.authorized}
        showSearchBar={this.showSearchBar()}
      />
    );
  }

  private showSearchBar(): boolean {
    return this.props.authorized && this.props.showSearchBar;
  }
}

function mapStateToProps(state: LoginState): StateProps {
  return {
    authorized: state.user && state.user.authenticated,
  };
}

export default connect(mapStateToProps)(TopNavbarContainer);
