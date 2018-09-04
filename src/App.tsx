import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ConfigLoader from './config/ConfigLoader';
import { linksReducer } from './links/linksReducer';

import searchVideosMiddleware from './search-videos/searchVideosMiddleware';
import SearchView from './search-videos/SearchView';
import { videosReducer } from './search-videos/videosReducer';
import State from './State';

export default class App extends PureComponent {
  private store = createStore<State, any, any, any>(
    combineReducers({
      videos: videosReducer,
      links: linksReducer,
    }),
    applyMiddleware(searchVideosMiddleware),
  );

  private loadingComponent = () => <div>loading</div>;

  public render() {
    return (
      <Provider store={this.store}>
        <ConfigLoader loadingComponent={this.loadingComponent}>
          <SearchView />
        </ConfigLoader>
      </Provider>
    );
  }
}
