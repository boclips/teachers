import { actionCreatorFactory } from 'src/app/redux/actions';

export const storeReferrerShareCodeAction = actionCreatorFactory<{
  shareCode: string;
  refererId: string;
}>('STORE_REFERRER_SHARE_CODE');
