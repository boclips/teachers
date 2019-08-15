import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import queryString from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router';
import PrivateRoute, {
  PrivateRouteComponentParams,
} from '../../components/login/PrivateRoute';
import { RouterState } from '../../types/State';
import { CreateAccountView } from '../account/CreateAccountView';
import { BookmarkedCollectionListView } from '../collection/BookmarkedCollectionListView';
import CollectionDetailsView from '../collection/CollectionDetailsView';
import DiscoverCollectionsView from '../collection/DiscoverCollectionsView';
import MyCollectionListView from '../collection/MyCollectionListView';
import { PublicCollectionListView } from '../collection/PublicCollectionListView';
import { SubjectsView } from '../collection/SubjectsView';
import HomeView from '../home/HomeView';
import LoggedOutView from '../loggedout/LoggedOutView';
import SearchResultsView from '../searchResults/SearchResultsView';
import VideoDetailsView from '../videoDetails/VideoDetailsView';
import ScrollToTopOnForwardNavigation from './ScrollToTopOnForwardNavigation';

export const defaultHistory = createBrowserHistory();

const videoDetailsView = (props: RouteComponentProps<{ videoId: string }>) => (
  <VideoDetailsView videoId={props.match.params.videoId} />
);

const collectionView = (
  props: PrivateRouteComponentParams<{ collectionId: string }>,
) => (
  <CollectionDetailsView
    collectionId={props.computedMatch.params.collectionId}
  />
);

const discoverCollectionsView = (props: RouteComponentProps) => {
  const queryParams = queryString.parse(props.location.search);
  const subjectIdQuery = queryParams.subject as string[] | string;
  const disciplineId = queryParams.discipline as string;

  let subjectIds;
  if (!subjectIdQuery) {
    subjectIds = [];
  } else if (subjectIdQuery instanceof Array) {
    subjectIds = subjectIdQuery;
  } else {
    subjectIds = [subjectIdQuery];
  }

  return (
    <DiscoverCollectionsView
      subjectIds={subjectIds}
      disciplineId={disciplineId}
    />
  );
};

interface StateProps {
  pathname: string;
  search: string;
}

class BoclipsRouter extends Component<{ history: History } & StateProps> {
  public render() {
    return (
      <ConnectedRouter history={this.props.history || defaultHistory}>
        <ScrollToTopOnForwardNavigation>
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
              component={MyCollectionListView}
              exact={true}
            />
            <PrivateRoute
              path="/public-collections"
              component={PublicCollectionListView}
              exact={true}
            />
            <PrivateRoute
              path="/discover-collections"
              component={discoverCollectionsView}
              exact={true}
            />
            <PrivateRoute
              path="/bookmarked-collections"
              component={BookmarkedCollectionListView}
              exact={true}
            />
            <PrivateRoute
              path="/collections/:collectionId"
              component={collectionView}
            />
            <PrivateRoute
              path="/our-subjects"
              component={SubjectsView}
              exact={true}
            />
            <PrivateRoute path="/">
              <HomeView />
            </PrivateRoute>
          </Switch>
        </ScrollToTopOnForwardNavigation>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = ({
  router: { location },
}: RouterState): StateProps => ({
  pathname: location.pathname,
  search: location.search,
});

export default connect(mapStateToProps)(BoclipsRouter);
