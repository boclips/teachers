import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoSearchResults } from '../../../../types/State';

export const storeVideoSearchResultsAction = actionCreatorFactory<
  VideoSearchResults
>('STORE_VIDEOS');
