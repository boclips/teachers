import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import LoginView from '../login/LoginView';
import PrivateRoute from '../login/PrivateRoute';
import SearchResultsView from '../videos/search-videos/SearchResultsView';
import SearchLayout from '../videos/SearchLayout';
import VideoDetailsView from '../videos/video-details/VideoDetailsView';

export const defaultHistory = createBrowserHistory();

function renderVideoDetailsView({ computedMatch }: any) {
  return <VideoDetailsView videoId={computedMatch.params.videoId} />;
}

export class BoclipsRouter extends Component<{ history: History }> {
  public render() {
    return (
      <ConnectedRouter history={this.props.history || defaultHistory}>
        <Switch>
          <Route exact={true} path="/login" component={LoginView} />
          <Route path="/">
            <SearchLayout>
              <Switch>
                <PrivateRoute
                  exact={true}
                  path="/videos"
                  component={SearchResultsView}
                />
                <PrivateRoute
                  exact={true}
                  path="/videos/:videoId"
                  component={renderVideoDetailsView}
                />
                <PrivateRoute
                  exact={true}
                  path="/"
                  component={SearchResultsView}
                />
              </Switch>
            </SearchLayout>
          </Route>
        </Switch>
      </ConnectedRouter>
    );
  }
}
