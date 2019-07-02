import { RouterState } from 'connected-react-router';
import configureStore from 'redux-mock-store';
import updatePageActionMiddleware from '../src/components/searchResults/redux/middleware/updatePageActionMiddleware';
import UpdateSearchParametersMiddleware from '../src/components/searchResults/redux/middleware/updateSearchParametersMiddleware';
import { RouterFactory } from './factories';

export const setupStore = (query: string) => {
  const mockStore = configureStore<{ router: RouterState }>([
    ...UpdateSearchParametersMiddleware,
    updatePageActionMiddleware,
  ]);

  return mockStore({
    router: RouterFactory.sample({
      location: {
        pathname: '',
        search: `?${query}`,
        hash: '',
        state: null,
      },
    }),
  });
};
