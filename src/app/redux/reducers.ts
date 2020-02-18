import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import reduceReducers from 'reduce-reducers';
import { combineReducers, Reducer } from 'redux';
import { countriesReducer } from 'src/components/account/onboarding/redux/reducers/countriesReducer';
import {
  collectionHandlers,
  initialCollectionsState,
} from 'src/components/collection/redux/reducers/collectionsReducer';
import { tagsReducer } from 'src/components/common/tags/redux/reducers/tagsReducer';
import { disciplinesReducer } from 'src/components/disciplines/redux/reducers/disciplinesReducer';
import { userDetailsFetchedReducer } from 'src/components/login/redux/reducers/userDetailsFetchedReducer';
import { subjectsReducer } from 'src/components/multipleSelect/redux/reducers/subjectsReducer';
import {
  collectionSearchHandlers,
  initialSearchState,
  videoSearchHandlers,
} from 'src/components/searchBar/redux/reducers/searchReducer';
import {
  initialVideoState,
  videoHandlers,
} from 'src/components/video/redux/reducers/videoReducer';
import State from 'src/types/State';
import { linkHandlers } from './links/reducers/linksReducer';
import { createReducer, noReducer } from './createReducer';
import { authenticationReducer } from './authentication/reducers/authenticationReducer';

const stateReducer: Reducer<State> = createReducer(
  ...linkHandlers,
  ...videoSearchHandlers,
  ...collectionSearchHandlers,
  ...collectionHandlers,
  ...videoHandlers,
);

const dummyApiReducer: Reducer<string> = (state = '') => state;

export const createReducers = (history: History<any>): Reducer<State> =>
  reduceReducers<State>(
    combineReducers({
      entities: noReducer({ collections: { byId: {} }, videos: { byId: {} } }),
      search: noReducer(initialSearchState),
      links: noReducer({ entries: null, loadingState: null }),
      loadingState: null,
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
      router: connectRouter(history),
    }),
    stateReducer,
  );
