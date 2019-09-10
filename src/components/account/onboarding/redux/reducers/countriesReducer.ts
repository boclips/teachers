import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../../app/redux/createReducer';
import { Country } from '../../../../../types/Country';
import { fetchedCountriesAction } from '../actions/fetchedCountriesAction';

export const countriesReducer: Reducer<Country[]> = createReducer(
  [],
  actionHandler(fetchedCountriesAction, (_: Country[], subjects: Country[]) => {
    return subjects;
  }),
);
