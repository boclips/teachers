import createBrowserHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
import PrivateRoute from '../login/PrivateRoute';
import SearchResultsView from '../videos/search-videos/SearchResultsView';
import VideoDetailsView from '../videos/video-details/VideoDetailsView';

export const defaultHistory = createBrowserHistory();

export default class SearchLayoutRouter extends Component<{}> {
  public render() {
    return (
      <section>
        <PrivateRoute
          exact={true}
          path="/videos"
          component={SearchResultsView}
        />
        <PrivateRoute
          exact={true}
          path="/videos/:videoId"
          component={VideoDetailsView}
        />
        <PrivateRoute exact={true} path="/" component={SearchResultsView} />
      </section>
    );
  }
}
