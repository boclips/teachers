import {
  connectRouter,
  routerMiddleware,
  RouterState,
} from 'connected-react-router';
import { History } from 'history';
import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import reduceReducers from 'reduce-reducers';
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
import {
  collectionHandlers,
  initialCollectionsState,
} from '../components/collection/redux/reducers/collectionsReducer';
import fetchTagsMiddleware from '../components/common/tags/redux/middleware/fetchTagsMiddleware';
import { tagsReducer } from '../components/common/tags/redux/reducers/tagsReducer';
import fetchDisciplinesMiddleware from '../components/disciplines/redux/middleware/fetchDisciplinesMiddleware';
import { disciplinesReducer } from '../components/disciplines/redux/reducers/disciplinesReducer';
import onStoreLoginMiddleware from '../components/login/redux/middleware/onLoginMiddleware';
import onRegisterUserForAnalytics from '../components/login/redux/middleware/onRegisterUserForAnalytics';
import { userDetailsFetchedReducer } from '../components/login/redux/reducers/userDetailsFetchedReducer';
import fetchSubjectsMiddleware from '../components/multipleSelect/redux/middleware/fetchSubjectsMiddleware';
import { subjectsReducer } from '../components/multipleSelect/redux/reducers/subjectsReducer';
import searchMiddleware from '../components/searchBar/redux/middleware/searchMiddleware';
import {
  collectionSearchHandlers,
  initialSearchState,
  videoSearchHandlers,
} from '../components/searchBar/redux/reducers/searchReducer';
import updatePageActionMiddleware from '../components/searchResults/redux/middleware/updatePageActionMiddleware';
import updateSearchParametersMiddleware from '../components/searchResults/redux/middleware/updateSearchParametersMiddleware';
import fetchVideosMiddleware from '../components/video/redux/middleware/fetchVideosMiddleware';
import videoDetailsMiddleware from '../components/video/redux/middleware/videoDetailsMiddleware';
import {
  initialVideoState,
  videoHandlers,
} from '../components/video/redux/reducers/videoReducer';
import State from '../types/State';
import BoclipsRouter, { defaultHistory } from '../views/router/BoclipsRouter';
import LinkLoader from './config/LinkLoader';
import onAuthenticationResolvedMiddleware from './redux/authentication/middleware/onAuthenticationResolvedMiddleware';
import requestAuthenticationMiddleware from './redux/authentication/middleware/requestAuthenticationMiddleware';
import { authenticationReducer } from './redux/authentication/reducers/authenticationReducer';
import { createReducer, noReducer } from './redux/createReducer';
import fetchLinksMiddleware from './redux/links/middleware/fetchLinksMiddleware';
import { linksReducer } from './redux/links/reducers/linksReducer';
import { sentryBreadcrumbMiddleware } from './redux/sentryBreadcrumbMiddleware';

declare global {
  interface Window {
    Appcues: Appcues;
  }

  interface Appcues {
    identify: (userId: string, user: any) => {};
    page: () => {};
    track: (event: string, payload: any) => {};
  }
}

const composeEnhancers =
  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose; // tslint:disable-line

export const stateReducer: Reducer<State> = createReducer(
  ...videoSearchHandlers,
  ...collectionSearchHandlers,
  ...collectionHandlers,
  ...videoHandlers,
);

const dummyApiReducer: Reducer<string> = (state = '') => state;
const dummyRouter: Reducer<RouterState> = (state = null) => state;

const subStateReducers: Reducer<State> = combineReducers({
  entities: noReducer({ collections: { byId: {} }, videos: { byId: {} } }),
  search: noReducer(initialSearchState),
  links: linksReducer,
  video: noReducer(initialVideoState),
  videos: noReducer({ promotedVideoIds: [] }),
  user: userDetailsFetchedReducer,
  authentication: authenticationReducer,
  collections: noReducer(initialCollectionsState),
  subjects: subjectsReducer,
  countries: countriesReducer,
  tags: tagsReducer,
  disciplines: disciplinesReducer,
  apiPrefix: dummyApiReducer,
  router: dummyRouter,
});

const appReducer: Reducer<State> = reduceReducers(
  subStateReducers,
  stateReducer,
);

interface Props {
  apiPrefix: string;
  history?: History;
}

export default class App extends PureComponent<Props> {
  private store = createStore<State, any, any, any>(
    connectRouter(defaultHistory)(appReducer),
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
        onRegisterUserForAnalytics,
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
      <React.Fragment>
        <Helmet
          defaultTitle="Boclips for teachers"
          titleTemplate="%s - Boclips for teachers"
        />
        <Provider store={this.store}>
          <LinkLoader>
            <BoclipsRouter history={this.props.history} />
          </LinkLoader>
        </Provider>
      </React.Fragment>
    );
  }
}
