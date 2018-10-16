import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import ConfigLoader from './config/ConfigLoader';
import { linksReducer } from './links/linksReducer';

import { Icon } from 'antd';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import BoclipsRouter, { defaultHistory } from './router/BoclipsRouter';
import State from './State';
import searchVideosMiddleware from './videos/search-videos/searchVideosMiddleware';
import { searchReducer } from './videos/searchReducer';
import videoDetailsMiddleware from './videos/video-details/videoDetailsMiddleware';
import { videoReducer } from './videos/videoReducer';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose; // tslint:disable-line

const rootReducer = combineReducers({
  search: searchReducer,
  links: linksReducer,
  video: videoReducer,
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
        videoDetailsMiddleware,
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
          <BoclipsRouter history={this.props.history} />
        </ConfigLoader>
      </Provider>
    );
  }
}
