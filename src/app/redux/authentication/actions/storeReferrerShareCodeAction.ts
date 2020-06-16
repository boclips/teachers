import {actionCreatorFactory} from "src/app/redux/actions";

export const storeReferrerShareCodeAction = actionCreatorFactory<string>(
  'STORE_REFERRER_SHARE_CODE',
);
