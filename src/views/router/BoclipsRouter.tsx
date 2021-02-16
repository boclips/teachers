import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router';
import ConnectedNewSearchResultsView from 'src/views/searchResults/SearchResultsView';
import { Constants } from 'src/app/AppConstants';
import { RouterState } from 'src/types/State';
import SubjectSearchView from 'src/views/collection/SubjectSearchView';
import PrivateRoute from '../../components/login/PrivateRoute';
import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';
import { AccountSettingsView } from '../account/AccountSettingsView';
import CreateAccountView from '../account/CreateAccountView';
import { OnboardingView } from '../account/OnboardingView';
import { CollectionDetailsView } from '../collection/CollectionDetailsView';
import { SubjectsView } from '../collection/SubjectsView';
import HomeView from '../home/HomeView';
import LoggedOutView from '../loggedout/LoggedOutView';
import VideoDetailsView from '../videoDetails/VideoDetailsView';
import TrialExpiredView from '../trial/TrialExpiredView';
import { ErrorView } from '../error/ErrorView';
import MyResourcesListView from '../collection/MyResourcesListView';
import ScrollToTopOnForwardNavigation from './ScrollToTopOnForwardNavigation';

const videoDetailsView = ({
  match,
}: RouteComponentProps<{ videoId: string }>) => (
  <VideoDetailsView videoId={match.params.videoId} />
);

const collectionView = ({
  match,
}: RouteComponentProps<{ collectionId: string }>) => (
  <CollectionDetailsView collectionId={match.params.collectionId} />
);

const subjectSearchView = ({
  match,
}: RouteComponentProps<{ subjectId: string }>) => {
  const subjectId = match.params.subjectId;

  return <SubjectSearchView subjectId={subjectId} />;
};

interface StateProps {
  pathname: string;
  search: string;
}

interface Props {
  history: History;
}

class BoclipsRouter extends Component<Props & StateProps> {
  public componentDidMount() {
    this.trackRenderedPage();
  }

  public componentDidUpdate() {
    this.trackRenderedPage();
  }

  private getFullUrl() {
    const { pathname, search } = this.props;
    return Constants.HOST + pathname + search;
  }

  private trackRenderedPage() {
    AnalyticsFactory.internalAnalytics().trackPageRendered(this.getFullUrl());
  }

  public render() {
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <ScrollToTopOnForwardNavigation>
          <Switch>
            <Route path="/bye" component={LoggedOutView} />
            <Route path="/error" component={ErrorView} />
            <Route path="/trial-expired" component={TrialExpiredView} />
            <Route path="/create-account" component={CreateAccountView} />
            <Route path="/videos">
              <Switch>
                <Route path="/videos/:videoId" component={videoDetailsView} />
                <PrivateRoute
                  path="/videos"
                  component={ConnectedNewSearchResultsView}
                />
              </Switch>
            </Route>
            <PrivateRoute path="/onboarding" component={OnboardingView} exact />
            <Route path="/collections">
              <Switch>
                <Route
                  path="/collections/:collectionId"
                  component={collectionView}
                />
                <PrivateRoute
                  path="/collections"
                  component={MyResourcesListView}
                />
              </Switch>
            </Route>
            <Route
              path="/subjects/:subjectId"
              component={subjectSearchView}
              exact
            />
            <PrivateRoute path="/our-subjects" component={SubjectsView} exact />
            <PrivateRoute
              path="/account-settings"
              component={AccountSettingsView}
              exact
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
