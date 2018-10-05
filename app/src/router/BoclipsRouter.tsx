import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import SearchResultsView from '../videos/search-videos/SearchResultsView';
import SearchLayout from '../videos/SearchLayout';
import VideoDetailsView from '../videos/video-details/VideoDetailsView';

export const defaultHistory = createBrowserHistory();

function videoDetailsView(props: RouteComponentProps<{ videoId: string }>) {
  return <VideoDetailsView videoId={props.match.params.videoId} />;
}

export class BoclipsRouter extends Component<{ history: History }> {
  public render() {
    return (
      <ConnectedRouter history={this.props.history || defaultHistory}>
        <Switch>
          <Route path="/">
            <SearchLayout>
              <Switch>
                <Route path="/videos/:videoId" component={videoDetailsView} />
                <Route path="/videos" component={SearchResultsView} />
                <Route path="/" component={SearchResultsView} />
              </Switch>
            </SearchLayout>
          </Route>
        </Switch>
      </ConnectedRouter>
    );
  }
}
