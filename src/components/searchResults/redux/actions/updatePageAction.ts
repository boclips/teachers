import { actionCreatorFactory } from '../../../../app/redux/actions';

export interface PageChangeRequest {
  page: number;
}

export const updatePageAction = actionCreatorFactory<PageChangeRequest>(
  'UDPATE_PAGE_PARAM',
);
