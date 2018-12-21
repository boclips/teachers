import { actionCreatorFactory } from '../../../../redux/actions';
import { SearchRequest } from '../../../../services/types/SearchRequest';

export const searchVideosAction = actionCreatorFactory<SearchRequest>(
  'SEARCH_VIDEOS',
);
