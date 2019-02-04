import { ConnectedRouter } from 'connected-react-router';
import { History, Location } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router';
import PrivateRoute from '../../components/login/PrivateRoute';
import TopSearchBarLayout from '../../components/searchBar/TopSearchBarLayout';
import { RouterState } from '../../types/State';
import CollectionView from '../collection/CollectionView';
import HomeView from '../home/HomeView';
import LoggedOutView from '../loggedout/LoggedOutView';
import SearchResultsView from '../searchResults/SearchResultsView';
import VideoDetailsView from '../videoDetails/VideoDetailsView';

export const defaultHistory = createBrowserHistory();

function videoDetailsView(props: RouteComponentProps<{ videoId: string }>) {
  return <VideoDetailsView videoId={props.match.params.videoId} />;
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
            <TopSearchBarLayout showTabs={this.props.isSearchView}>
              <Switch>
                <Route path="/videos/:videoId" component={videoDetailsView} />
                <PrivateRoute path="/videos" component={SearchResultsView} />
              </Switch>
            </TopSearchBarLayout>
          </Route>
          <PrivateRoute
            path="/collections/default"
            component={CollectionView}
          />
          <PrivateRoute path="/" component={HomeView} />
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
