import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import React, { Component, SFC } from 'react';
import { Route, Switch } from 'react-router';
import LoginView from '../login/LoginView';
import PrivateRoute from '../login/PrivateRoute';
import SearchView from '../videos/search-videos/SearchView';
import VideoDetailsView from '../videos/video-details/VideoDetailsView';

export const defaultHistory = createBrowserHistory();

function withPathParams<T>(component: SFC<T>): SFC {
  return (props: any) => component(props.computedMatch.params as T);
}

export class BoclipsRouter extends Component<{ history: History }> {
  private renderVideoDetailsView = ({ videoId }: { videoId: string }) => (
    <VideoDetailsView videoId={videoId} />
  );

  public render() {
    return (
      <ConnectedRouter history={this.props.history || defaultHistory}>
        <Switch>
          <Route exact={true} path="/login" component={LoginView} />
          <PrivateRoute
            exact={true}
            path="/videos/:videoId"
            component={withPathParams(this.renderVideoDetailsView)}
          />
          <PrivateRoute path="/" component={SearchView} />
        </Switch>
      </ConnectedRouter>
    );
  }
}
