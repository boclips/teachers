import React from 'react';
import { connect } from 'react-redux';
import MediaBreakpoints from '../../../types/MediaBreakpoints';
import { LoginState } from '../../../types/State';
import withMediaBreakPoint, {
  WithMediaBreakPointProps,
} from '../../common/higerOrderComponents/withMediaBreakPoint';
import TopNavbarComponent from './TopNavbarComponent';

interface Props extends WithMediaBreakPointProps {
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
        isMobile={this.isMobile()}
      />
    );
  }

  private showSearchBar(): boolean {
    return this.props.authorized && this.props.showSearchBar;
  }

  private isMobile(): boolean {
    return this.props.mediaBreakpoint.width <= MediaBreakpoints.lg.width;
  }
}

function mapStateToProps(state: LoginState): StateProps {
  return {
    authorized: state.user && state.user.authenticated,
  };
}

export default connect(mapStateToProps)(
  withMediaBreakPoint(TopNavbarContainer),
);