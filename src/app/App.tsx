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
import updateUserMiddleware from '../components/account/accountSettings/redux/middleware/updateUserMiddleware';
import fetchCountriesMiddleware from '../components/account/onboarding/redux/middleware/fetchCountriesMiddleware';
import { countriesReducer } from '../components/account/onboarding/redux/reducers/countriesReducer';
import collectionMiddleware from '../components/collection/redux/middleware/collectionMiddleware';
import { collectionsReducer } from '../components/collection/redux/reducers/collectionsReducer';
import fetchTagsMiddleware from '../components/common/tags/redux/middleware/fetchTagsMiddleware';
import { tagsReducer } from '../components/common/tags/redux/reducers/tagsReducer';
import fetchDisciplinesMiddleware from '../components/disciplines/redux/middleware/fetchDisciplinesMiddleware';
import { disciplinesReducer } from '../components/disciplines/redux/reducers/disciplinesReducer';
import onStoreLoginMiddleware from '../components/login/redux/middleware/onLoginMiddleware';
import onRegisterAnalyticsMiddleware from '../components/login/redux/middleware/onRegisterAnalyticsMiddleware';
import onRegisterAppcuesMiddleware from '../components/login/redux/middleware/onRegisterAppcuesMiddleware';
import { userDetailsFetchedReducer } from '../components/login/redux/reducers/userDetailsFetchedReducer';
import fetchSubjectsMiddleware from '../components/multipleSelect/redux/middleware/fetchSubjectsMiddleware';
import { subjectsReducer } from '../components/multipleSelect/redux/reducers/subjectsReducer';
import searchMiddleware from '../components/searchBar/redux/middleware/searchMiddleware';
import { searchReducer } from '../components/searchBar/redux/reducers/searchReducer';
import updatePageActionMiddleware from '../components/searchResults/redux/middleware/updatePageActionMiddleware';
import updateSearchParametersMiddleware from '../components/searchResults/redux/middleware/updateSearchParametersMiddleware';
import fetchVideosMiddleware from '../components/video/redux/middleware/fetchVideosMiddleware';
import videoDetailsMiddleware from '../components/video/redux/middleware/videoDetailsMiddleware';
import { videoReducer } from '../components/video/redux/reducers/videoReducer';
import State from '../types/State';
import BoclipsRouter, { defaultHistory } from '../views/router/BoclipsRouter';
import LinkLoader from './config/LinkLoader';
import onAuthenticationResolvedMiddleware from './redux/authentication/middleware/onAuthenticationResolvedMiddleware';
import requestAuthenticationMiddleware from './redux/authentication/middleware/requestAuthenticationMiddleware';
import { authenticationReducer } from './redux/authentication/reducers/authenticationReducer';
import fetchLinksMiddleware from './redux/links/middleware/fetchLinksMiddleware';
import { linksReducer } from './redux/links/reducers/linksReducer';
import { sentryBreadcrumbMiddleware } from './redux/sentryBreadcrumbMiddleware';

declare global {
  interface Window {
    Appcues: {
      identify: (userId: string, user: any) => {};
      page: () => {};
    };
  }
}

const composeEnhancers =
  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose; // tslint:disable-line

const rootReducer: Reducer<any> = combineReducers({
  search: searchReducer,
  links: linksReducer,
  video: videoReducer,
  user: userDetailsFetchedReducer,
  authentication: authenticationReducer,
  collections: collectionsReducer,
  subjects: subjectsReducer,
  countries: countriesReducer,
  tags: tagsReducer,
  disciplines: disciplinesReducer,
  apiPrefix: (state = {}) => state,
});

interface Props {
  apiPrefix: string;
  history?: History;
}

export default class App extends PureComponent<Props> {
  private store = createStore<State, any, any, any>(
    connectRouter(defaultHistory)(rootReducer),
    {
      apiPrefix: this.props.apiPrefix,
    },
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(this.props.history || defaultHistory),
        sentryBreadcrumbMiddleware,
        ...searchMiddleware,
        videoDetailsMiddleware,
        ...fetchVideosMiddleware,
        fetchLinksMiddleware,
        onStoreLoginMiddleware,
        onAuthenticationResolvedMiddleware,
        ...requestAuthenticationMiddleware,
        onRegisterAnalyticsMiddleware,
        onRegisterAppcuesMiddleware,
        ...collectionMiddleware,
        fetchSubjectsMiddleware,
        fetchCountriesMiddleware,
        fetchTagsMiddleware,
        ...updateSearchParametersMiddleware,
        updatePageActionMiddleware,
        fetchDisciplinesMiddleware,
        updateUserMiddleware,
      ),
    ),
  );

  public render() {
    return (
      <Provider store={this.store}>
        <LinkLoader>
          <BoclipsRouter history={this.props.history} />
        </LinkLoader>
      </Provider>
    );
  }
}
