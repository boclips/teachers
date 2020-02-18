import { actionCreatorFactory } from 'src/app/redux/actions';
import { Country } from 'src/types/Country';

export const fetchedCountriesAction = actionCreatorFactory<Country[]>(
  'COUNTRIES_FETCHED',
);
