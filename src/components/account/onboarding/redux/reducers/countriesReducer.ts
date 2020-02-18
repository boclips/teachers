import { Reducer } from 'redux';
import { Country } from 'src/types/Country';
import createReducerWithInitialState, {
  actionHandler,
} from '../../../../../app/redux/createReducer';
import { fetchedCountriesAction } from '../actions/fetchedCountriesAction';

export const countriesReducer: Reducer<Country[]> = createReducerWithInitialState(
  [],
  actionHandler(
    fetchedCountriesAction,
    (_: Country[], subjects: Country[]) => subjects,
  ),
);
