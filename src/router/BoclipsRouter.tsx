import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router';
import PrivateRoute from '../components/login/PrivateRoute';
import TopSearchBarLayout from '../components/searchBar/TopSearchBarLayout';
import { RouterState } from '../redux/State';
import HomeView from '../views/home/HomeView';
import LoggedOutView from '../views/loggedout/LoggedOutView';
import SearchResultsView from '../views/searchResults/SearchResultsView';
import VideoDetailsView from '../views/videoDetails/VideoDetailsView';

export const defaultHistory = createBrowserHistory();

function videoDetailsView(props: RouteComponentProps<{ videoId: string }>) {
  return <VideoDetailsView videoId={props.match.params.videoId} />;
}

class BoclipsRouter extends Component<{ history: History }> {
  public render() {
    return (
      <ConnectedRouter history={this.props.history || defaultHistory}>
        <Switch>
          <Route path="/bye" component={LoggedOutView} />
          <Route path="/videos">
            <TopSearchBarLayout>
              <Switch>
                <Route path="/videos/:videoId" component={videoDetailsView} />
                <PrivateRoute path="/videos" component={SearchResultsView} />
              </Switch>
            </TopSearchBarLayout>
          </Route>
          <PrivateRoute path="/" component={HomeView} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

function mapStateToProps(state: RouterState): {} {
  return {
    pathname: state.router.location.pathname,
    search: state.router.location.search,
  };
}

export default connect(mapStateToProps)(BoclipsRouter);
