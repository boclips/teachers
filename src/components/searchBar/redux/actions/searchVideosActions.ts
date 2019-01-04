import { actionCreatorFactory } from '../../../../app/redux/actions';
import { SearchRequest } from '../../../../types/SearchRequest';

export const searchVideosAction = actionCreatorFactory<SearchRequest>(
  'SEARCH_VIDEOS',
);
