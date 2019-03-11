import { ConnectedRouter } from 'connected-react-router';
import { History, Location } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router';
import PrivateRoute, {
  PrivateRouteComponentProps,
} from '../../components/login/PrivateRoute';
import NavBar from '../../components/topNavbar/NavBar';
import { RouterState } from '../../types/State';
import CollectionListView from '../collection/CollectionListView';
import CollectionView from '../collection/CollectionView';
import HomeView from '../home/HomeView';
import LoggedOutView from '../loggedout/LoggedOutView';
import SearchResultsView from '../searchResults/SearchResultsView';
import VideoDetailsView from '../videoDetails/VideoDetailsView';

export const defaultHistory = createBrowserHistory();

function videoDetailsView(props: RouteComponentProps<{ videoId: string }>) {
  return <VideoDetailsView videoId={props.match.params.videoId} />;
}

function collectionView(
  props: PrivateRouteComponentProps<{ collectionId: string }>,
) {
  return (
    <CollectionView collectionId={props.computedMatch.params.collectionId} />
  );
}

interface StateProps {
  pathname: string;
  search: string;
  isSearchView: boolean;
}

class BoclipsRouter extends Component<{ history: History } & StateProps> {
  public render() {
    return (
      <ConnectedRouter history={this.props.history || defaultHistory}>
        <Switch>
          <Route path="/bye" component={LoggedOutView} />
          <Route path="/videos">
            <NavBar showTabs={this.props.isSearchView}>
              <Switch>
                <Route path="/videos/:videoId" component={videoDetailsView} />
                <PrivateRoute path="/videos" component={SearchResultsView} />
              </Switch>
            </NavBar>
          </Route>
          <PrivateRoute
            path="/collections"
            component={CollectionListView}
            exact={true}
          />
          <PrivateRoute
            path="/collections/:collectionId"
            component={collectionView}
          />
          <PrivateRoute path="/">
            <NavBar
              showTabs={this.props.isSearchView}
              showSearchBar={this.props.isSearchView}
            >
              <HomeView />
            </NavBar>
          </PrivateRoute>
        </Switch>
      </ConnectedRouter>
    );
  }
}

function isSearchView(location: Location): boolean {
  return !!(
    location.pathname &&
    location.pathname.indexOf('videos') !== -1 &&
    location.search
  );
}

function mapStateToProps(state: RouterState): StateProps {
  const location = state.router.location;
  return {
    pathname: location.pathname,
    search: location.search,
    isSearchView: isSearchView(location),
  };
}

export default connect(mapStateToProps)(BoclipsRouter);
