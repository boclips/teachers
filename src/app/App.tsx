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
import videoDetailsMiddleware from '../components/video/redux/middleware/videoDetailsMiddleware';
import { videoReducer } from '../components/video/redux/reducers/videoReducer';
import onUrlChangeMiddleware from '../onUrlChangeMiddleware';
import State from '../redux/State';
import BoclipsRouter, { defaultHistory } from '../router/BoclipsRouter';
import fetchLinksMiddleware from '../services/links/redux/middleware/fetchLinksMiddleware';
import onLinksFetchedMiddleware from '../services/links/redux/middleware/onLinksFetchedMiddleware';
import { linksReducer } from '../services/links/redux/reducers/linksReducer';
import ConfigLoader from './configLoader/ConfigLoader';

const composeEnhancers =
  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose; // tslint:disable-line

const rootReducer: Reducer<any> = combineReducers({
  search: searchReducer,
  links: linksReducer,
  video: videoReducer,
  login: loginReducer,
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
