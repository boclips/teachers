import { actionCreatorFactory } from '../../../../../app/redux/actions';
import { Country } from '../../../../../types/Country';

export const fetchedCountriesAction = actionCreatorFactory<Country[]>(
  'COUNTRIES_FETCHED',
);
