import { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

class ScrollToTopOnForwardNavigation extends Component<RouteComponentProps> {
  public componentWillReceiveProps(nextProps) {
    if (this.isForwardNavigation(nextProps)) {
      window.scrollTo(0, 0);
    }
  }

  public render() {
    return this.props.children;
  }

  private isForwardNavigation(nextProps): boolean {
    return (
      nextProps.location !== this.props.location &&
      nextProps.history.action === 'PUSH'
    );
  }
}

export default withRouter(ScrollToTopOnForwardNavigation);
