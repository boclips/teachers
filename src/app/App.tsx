import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import createBrowserHistory from 'history/createBrowserHistory';
import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import updateUserMiddleware from '../components/account/accountSettings/redux/middleware/updateUserMiddleware';
import fetchCountriesMiddleware from '../components/account/onboarding/redux/middleware/fetchCountriesMiddleware';
import collectionMiddleware from '../components/collection/redux/middleware/collectionMiddleware';
import fetchTagsMiddleware from '../components/common/tags/redux/middleware/fetchTagsMiddleware';
import fetchDisciplinesMiddleware from '../components/disciplines/redux/middleware/fetchDisciplinesMiddleware';
import onStoreLoginMiddleware from '../components/login/redux/middleware/onLoginMiddleware';
import onRegisterUserForAnalytics from '../components/login/redux/middleware/onRegisterUserForAnalytics';
import fetchSubjectsMiddleware from '../components/multipleSelect/redux/middleware/fetchSubjectsMiddleware';
import searchMiddleware from '../components/searchBar/redux/middleware/searchMiddleware';
import updatePageActionMiddleware from '../components/searchResults/redux/middleware/updatePageActionMiddleware';
import updateSearchParametersMiddleware from '../components/searchResults/redux/middleware/updateSearchParametersMiddleware';
import fetchVideosMiddleware from '../components/video/redux/middleware/fetchVideosMiddleware';
import videoDetailsMiddleware from '../components/video/redux/middleware/videoDetailsMiddleware';
import State from '../types/State';
import BoclipsRouter from '../views/router/BoclipsRouter';
import LinkLoader from './config/LinkLoader';
import onAuthenticationResolvedMiddleware from './redux/authentication/middleware/onAuthenticationResolvedMiddleware';
import requestAuthenticationMiddleware from './redux/authentication/middleware/requestAuthenticationMiddleware';
import fetchLinksMiddleware from './redux/links/middleware/fetchLinksMiddleware';
import { createReducers } from './redux/reducers';
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
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

interface Props {
  apiPrefix: string;
  history?: History;
}

export default class App extends PureComponent<Props> {
  public static defaultProps = {
    history: createBrowserHistory(),
  };

  private store = createStore<State, any, any, any>(
    createReducers(this.props.history),
    {
      apiPrefix: this.props.apiPrefix,
    },
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(this.props.history),
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
