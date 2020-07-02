import { RouterState } from 'connected-react-router';
import configureStore from 'redux-mock-store';
import { updatePageActionMiddleware } from 'src/components/searchResults/redux/middleware/updatePageActionMiddleware';
import { updateSearchParametersMiddleware } from 'src/components/searchResults/redux/middleware/updateSearchParametersMiddleware';
import { RouterFactory } from './factories';

const setupStore = (query: string, pathname: string = '') => {
  const mockStore = configureStore<{ router: RouterState }>([
    ...updateSearchParametersMiddleware,
    updatePageActionMiddleware,
  ]);

  return mockStore({
    router: RouterFactory.sample({
      location: {
        pathname,
        search: `?${query}`,
        hash: '',
        state: null,
      },
    }),
  });
};

export default setupStore;
