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
import onStoreLoginMiddleware from '../components/login/redux/middleware/onStoreLoginMiddleware';
import { loginReducer } from '../components/login/redux/reducers/loginReducer';
import searchVideosMiddleware from '../components/searchBar/redux/middleware/searchVideosMiddleware';
import { searchReducer } from '../components/searchBar/redux/reducers/searchReducer';
import addToCollectionMiddleware from '../components/searchResults/multiple-results/redux/middleware/addToCollectionMiddleware';
import onUrlChangeMiddleware from '../components/video/redux/middleware/fetchVideosOnLocationChangeMiddleware';
import videoDetailsMiddleware from '../components/video/redux/middleware/videoDetailsMiddleware';
import { collectionReducer } from '../components/video/redux/reducers/collectionReducer';
import { videoReducer } from '../components/video/redux/reducers/videoReducer';
import State from '../types/State';
import BoclipsRouter, { defaultHistory } from '../views/router/BoclipsRouter';
import ConfigLoader from './configLoader/ConfigLoader';
import fetchLinksMiddleware from './redux/links/middleware/fetchLinksMiddleware';
import onLinksFetchedMiddleware from './redux/links/middleware/onLinksFetchedMiddleware';
import { linksReducer } from './redux/links/reducers/linksReducer';

const composeEnhancers =
  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose; // tslint:disable-line

const rootReducer: Reducer<any> = combineReducers({
  search: searchReducer,
  links: linksReducer,
  video: videoReducer,
  login: loginReducer,
  videoCollection: collectionReducer,
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
        onUrlChangeMiddleware,
        fetchLinksMiddleware,
        onLinksFetchedMiddleware,
        onStoreLoginMiddleware,
        addToCollectionMiddleware,
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
