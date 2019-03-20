import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router';
import PrivateRoute, {
  PrivateRouteComponentProps,
} from '../../components/login/PrivateRoute';
import { RouterState } from '../../types/State';
import { CreateAccountView } from '../account/CreateAccountView';
import CollectionListView from '../collection/CollectionListView';
import CollectionView from '../collection/CollectionView';
import { PublicCollectionListView } from '../collection/PublicCollectionListView';
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
}

class BoclipsRouter extends Component<{ history: History } & StateProps> {
  public render() {
    return (
      <ConnectedRouter history={this.props.history || defaultHistory}>
        <Switch>
          <Route path="/bye" component={LoggedOutView} />
          <Route path="/create-account" component={CreateAccountView} />
          <Route path="/videos">
            <Switch>
              <Route path="/videos/:videoId" component={videoDetailsView} />
              <PrivateRoute path="/videos" component={SearchResultsView} />
            </Switch>
          </Route>
          <PrivateRoute
            path="/collections"
            component={CollectionListView}
            exact={true}
          />
          <PrivateRoute
            path="/public-collections"
            component={PublicCollectionListView}
            exact={true}
          />
          <PrivateRoute
            path="/collections/:collectionId"
            component={collectionView}
          />
          <PrivateRoute path="/">
            <HomeView />
          </PrivateRoute>
        </Switch>
      </ConnectedRouter>
    );
  }
}

function mapStateToProps(state: RouterState): StateProps {
  const location = state.router.location;
  return {
    pathname: location.pathname,
    search: location.search,
  };
}

export default connect(mapStateToProps)(BoclipsRouter);
