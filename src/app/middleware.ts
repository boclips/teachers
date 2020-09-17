import { applyMiddleware, compose } from 'redux';
import { History } from 'history';
import { routerMiddleware } from 'connected-react-router';
import searchMiddleware from '../components/searchBar/redux/middleware/searchMiddleware';
import videoDetailsMiddleware from '../components/video/redux/middleware/videoDetailsMiddleware';
import fetchVideosMiddleware from '../components/video/redux/middleware/fetchVideosMiddleware';
import onStoreLoginMiddleware from '../components/login/redux/middleware/onLoginMiddleware';
import onRegisterUserForAnalytics from '../components/login/redux/middleware/onRegisterUserForAnalytics';
import collectionMiddleware from '../components/collection/redux/middleware/collectionMiddleware';
import fetchSubjectsMiddleware from '../components/multipleSelect/redux/middleware/fetchSubjectsMiddleware';
import fetchCountriesMiddleware from '../components/account/onboarding/redux/middleware/fetchCountriesMiddleware';
import fetchTagsMiddleware from '../components/common/tags/redux/middleware/fetchTagsMiddleware';
import { updateSearchParametersMiddleware } from '../components/searchResults/redux/middleware/updateSearchParametersMiddleware';
import { updatePageActionMiddleware } from '../components/searchResults/redux/middleware/updatePageActionMiddleware';
import fetchDisciplinesMiddleware from '../components/disciplines/redux/middleware/fetchDisciplinesMiddleware';
import updateUserMiddleware from '../components/account/accountSettings/redux/middleware/updateUserMiddleware';
import fetchLinksMiddleware from './redux/links/middleware/fetchLinksMiddleware';
import { sentryBreadcrumbMiddleware } from './redux/sentryBreadcrumbMiddleware';
import onAuthenticationResolvedMiddleware from 'src/app/redux/authentication/middleware/onAuthenticationResolvedMiddleware';
import requestAuthenticationMiddleware from 'src/app/redux/authentication/middleware/requestAuthenticationMiddleware';

export const createMiddleware = (history: History) => {
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      sentryBreadcrumbMiddleware,
      ...searchMiddleware,
      videoDetailsMiddleware,
      ...fetchVideosMiddleware,
      fetchLinksMiddleware,
      onStoreLoginMiddleware,
      ...onAuthenticationResolvedMiddleware,
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
  );
};
