import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import LoginView from '../login/LoginView';
import PrivateRoute from '../login/PrivateRoute';
import SearchView from '../videos/search-videos/SearchView';
import { VideoDetailsView } from '../videos/video-details/VideoDetailsView';

export const defaultHistory = createBrowserHistory();

export class BoclipsRouter extends Component<{ history: History }> {
  public render() {
    return (
      <ConnectedRouter history={this.props.history || defaultHistory}>
        <Switch>
          <Route exact={true} path="/login" component={LoginView} />
          <PrivateRoute
            exact={true}
            path="/videos/{id}"
            component={VideoDetailsView}
          />
          <PrivateRoute path="/" component={SearchView} />
        </Switch>
      </ConnectedRouter>
    );
  }
}
