import { Icon } from 'antd';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Reducer,
} from 'redux';
import collectionMiddleware from '../components/collection/redux/middleware/collectionMiddleware';
import { collectionsReducer } from '../components/collection/redux/reducers/collectionsReducer';
import onStoreLoginMiddleware from '../components/login/redux/middleware/onLoginMiddleware';
import onRegisterAnalyticsMiddleware from '../components/login/redux/middleware/onRegisterAnalyticsMiddleware';
import { userDetailsFetchedReducer } from '../components/login/redux/reducers/userDetailsFetchedReducer';
import searchVideosMiddleware from '../components/searchBar/redux/middleware/searchVideosMiddleware';
import { searchReducer } from '../components/searchBar/redux/reducers/searchReducer';
import fetchVideosMiddleware from '../components/video/redux/middleware/fetchVideosMiddleware';
import videoDetailsMiddleware from '../components/video/redux/middleware/videoDetailsMiddleware';
import { videoReducer } from '../components/video/redux/reducers/videoReducer';
import State from '../types/State';
import BoclipsRouter, { defaultHistory } from '../views/router/BoclipsRouter';
import ConfigLoader from './configLoader/ConfigLoader';
import fetchLinksMiddleware from './redux/links/middleware/fetchLinksMiddleware';
import { linksReducer } from './redux/links/reducers/linksReducer';

const composeEnhancers =
  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose; // tslint:disable-line

const rootReducer: Reducer<any> = combineReducers({
  search: searchReducer,
  links: linksReducer,
  video: videoReducer,
  user: userDetailsFetchedReducer,
  collections: collectionsReducer,
});

interface Props {
  history?: History;
}

export default class App extends PureComponent<Props> {
  public getStore() {
    return this.store;
  }

  private store = createStore<State, any, any, any>(
    connectRouter(defaultHistory)(rootReducer),
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(this.props.history || defaultHistory),
        searchVideosMiddleware,
        videoDetailsMiddleware,
        ...fetchVideosMiddleware,
        fetchLinksMiddleware,
        onStoreLoginMiddleware,
        onRegisterAnalyticsMiddleware,
        ...collectionMiddleware,
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
