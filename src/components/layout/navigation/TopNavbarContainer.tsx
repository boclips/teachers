import React from 'react';
import { connect } from 'react-redux';
import MediaBreakpoints from '../../../types/MediaBreakpoints';
import { UserState } from '../../../types/State';
import {
  withMediaBreakPoint,
  WithMediaBreakPointProps,
} from '../../common/higherOrderComponents/withMediaBreakPoint';
import { TopNavbar } from './TopNavbar';

interface Props extends WithMediaBreakPointProps {
  showTabs?: boolean;
  showSearchBar?: boolean;
  showNavigation?: boolean;
}

interface StateProps {
  authorized: boolean;
}

class TopNavbarContainerComponent extends React.PureComponent<
  Props & StateProps
> {
  public static defaultProps = {
    showTabs: false,
    showSearchBar: false,
    showNavigation: false,
    showFooter: false,
  };

  public render() {
    return (
      <TopNavbar
        showTabs={this.props.showTabs}
        authorized={this.props.authorized}
        showSearchBar={this.showSearchBar()}
        isMobile={this.isMobile()}
        showNavigation={this.props.showNavigation}
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

function mapStateToProps(state: UserState): StateProps {
  return {
    authorized: !!state.user,
  };
}

export const TopNavbarContainer = connect(mapStateToProps)(
  withMediaBreakPoint(TopNavbarContainerComponent),
);
