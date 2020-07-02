import { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

class ScrollToTopOnForwardNavigation extends Component<RouteComponentProps> {
  public componentDidUpdate(prevProps) {
    if (this.isForwardNavigation(prevProps)) {
      window.scrollTo(0, 0);
    }
  }

  public render() {
    return this.props.children;
  }

  private isForwardNavigation(prevProps): boolean {
    return (
      this.props.location !== prevProps.location &&
      this.props.history.action === 'PUSH'
    );
  }
}

export default withRouter(ScrollToTopOnForwardNavigation);
