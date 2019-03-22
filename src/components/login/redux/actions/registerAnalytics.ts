import { actionCreatorFactory } from '../../../../app/redux/actions';

export const registerAnalytics = actionCreatorFactory<string>(
  'REGISTER_ANALYTICS',
);
