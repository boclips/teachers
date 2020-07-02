import { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

class ScrollToTopOnForwardNavigation extends Component<RouteComponentProps> {
  public componentDidUpdate(prevProps) {
    if (this.isForwardNavigation(prevProps)) {
      window.scrollTo(0, 0);
    }
  }

  private isForwardNavigation(prevProps): boolean {
    const { location, history } = this.props;

    return location !== prevProps.location && history.action === 'PUSH';
  }

  public render() {
    const { children } = this.props;

    return children;
  }
}

export default withRouter(ScrollToTopOnForwardNavigation);
