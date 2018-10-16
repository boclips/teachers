import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { RouterState } from '../State';
import HomeView from '../videos/HomeView';
import SearchResultsView from '../videos/search-videos/SearchResultsView';
import TopSearchBarLayout from '../videos/TopSearchBarLayout';
import VideoDetailsView from '../videos/video-details/VideoDetailsView';

export const defaultHistory = createBrowserHistory();

function videoDetailsView(props: RouteComponentProps<{ videoId: string }>) {
  return <VideoDetailsView videoId={props.match.params.videoId} />;
}

class BoclipsRouter extends Component<{ history: History }> {
  public render() {
    return (
      <ConnectedRouter history={this.props.history || defaultHistory}>
        <Switch>
          <Route path="/videos">
            <TopSearchBarLayout>
              <Switch>
                <Route path="/videos/:videoId" component={videoDetailsView} />
                <Route path="/videos" component={SearchResultsView} />
              </Switch>
            </TopSearchBarLayout>
          </Route>
          <Route path="/" component={HomeView} />
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
