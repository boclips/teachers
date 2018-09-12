import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import ConfigLoader from './config/ConfigLoader';
import { linksReducer } from './links/linksReducer';

import { Icon } from 'antd';
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware,
} from 'connected-react-router';
import { History } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import { Route, Switch } from 'react-router';
import LoginView from './login/LoginView';
import PrivateRoute from './login/PrivateRoute';
import { userReducer } from './login/userReducer';
import searchVideosMiddleware from './search-videos/searchVideosMiddleware';
import SearchView from './search-videos/SearchView';
import { videosReducer } from './search-videos/videosReducer';
import State from './State';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose; // tslint:disable-line
const defaultHistory = createBrowserHistory();

const rootReducer = combineReducers({
  videos: videosReducer,
  links: linksReducer,
  user: userReducer,
});

interface Props {
  history?: History;
}

export default class App extends PureComponent<Props> {
  private store = createStore<State, any, any, any>(
    connectRouter(defaultHistory)(rootReducer),
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(this.props.history || defaultHistory),
        searchVideosMiddleware,
      ),
    ),
  );

  private loadingComponent = () => (
    <div className={'loading-site'}>
      <h3>
        <Icon type="loading" /> loading
      </h3>
    </div>
  );

  public render() {
    return (
      <Provider store={this.store}>
        <ConfigLoader loadingComponent={this.loadingComponent}>
          <ConnectedRouter history={this.props.history || defaultHistory}>
            <Switch>
              <Route exact={true} path="/login" component={LoginView} />
              <PrivateRoute path="/" component={SearchView} />
            </Switch>
          </ConnectedRouter>
        </ConfigLoader>
      </Provider>
    );
  }
}
