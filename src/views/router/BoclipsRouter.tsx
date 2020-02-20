import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import queryString from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Constants } from '../../app/AppConstants';
import PrivateRoute, {
  PrivateRouteComponentParams,
} from '../../components/login/PrivateRoute';
import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';
import { RouterState } from '../../types/State';
import { AccountSettingsView } from '../account/AccountSettingsView';
import CreateAccountView from '../account/CreateAccountView';
import { OnboardingView } from '../account/OnboardingView';
import { BookmarkedCollectionListView } from '../collection/BookmarkedCollectionListView';
import { CollectionDetailsView } from '../collection/CollectionDetailsView';
import DiscoverCollectionsView from '../collection/DiscoverCollectionsView';
import MyCollectionListView from '../collection/MyCollectionListView';
import { SubjectsView } from '../collection/SubjectsView';
import HomeView from '../home/HomeView';
import LoggedOutView from '../loggedout/LoggedOutView';
import SearchResultsView from '../searchResults/SearchResultsView';
import { VideoDetailsView } from '../videoDetails/VideoDetailsView';
import { TrialExpiredView } from '../trial/TrialExpiredView';
import { ErrorView } from '../error/ErrorView';
import { ConnectedNewSearchResultsView } from '../searchResults/NewSearchResultsView';
import ScrollToTopOnForwardNavigation from './ScrollToTopOnForwardNavigation';

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

interface Props {
  history: History;
}

class BoclipsRouter extends Component<Props & StateProps> {
  // TODO(AG/EV) REMOVE /new-filters PATH AFTER NEW FILTERS ARE RELEASED!
  public render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <ScrollToTopOnForwardNavigation>
          <Switch>
            <Route path="/bye" component={LoggedOutView} />
            <Route path="/error" component={ErrorView} />
            <Route path="/trial-expired" component={TrialExpiredView} />
            <Route path="/create-account" component={CreateAccountView} />
            <Route path="/videos">
              <Switch>
                <Route path="/videos/:videoId" component={videoDetailsView} />
                <PrivateRoute path="/videos" component={SearchResultsView} />
              </Switch>
            </Route>
            <PrivateRoute
              path="/new-filters"
              component={ConnectedNewSearchResultsView}
            />
            <PrivateRoute
              path="/onboarding"
              component={OnboardingView}
              exact={true}
            />
            <PrivateRoute
              path="/collections"
              component={MyCollectionListView}
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
            <PrivateRoute
              path="/account-settings"
              component={AccountSettingsView}
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

  public componentDidMount() {
    this.trackRenderedPage();
  }

  public componentDidUpdate(prevProps: Props & StateProps) {
    const previousPath = prevProps.pathname;
    const currentPath = this.props.pathname;

    this.trackRenderedPage();

    if (previousPath !== currentPath) {
      AnalyticsFactory.externalAnalytics().pageChange();
    }
  }

  private trackRenderedPage() {
    AnalyticsFactory.internalAnalytics().trackPageRendered(this.getFullUrl());
  }

  private getFullUrl() {
    return Constants.HOST + this.props.pathname + this.props.search;
  }
}

const mapStateToProps = ({
  router: { location },
}: RouterState): StateProps => ({
  pathname: location.pathname,
  search: location.search,
});

export default connect(mapStateToProps)(BoclipsRouter);
