import { actionCreatorFactory } from '../../../../app/redux/actions';

export interface FetchVideoParams {
  id: string;
  referer?: string;
  shareCode?: string;
}

export const fetchVideoAction = actionCreatorFactory<FetchVideoParams>(
  'FETCH_VIDEO',
);
