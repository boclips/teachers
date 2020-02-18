import { actionCreatorFactoryVoid } from 'src/app/redux/actions';

const clearSearchFilterParametersAction = actionCreatorFactoryVoid(
  'CLEAR_SEARCH_FILTERS_PARAMETERS',
);

export { clearSearchFilterParametersAction };
