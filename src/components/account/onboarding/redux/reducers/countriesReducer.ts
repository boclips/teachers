import { Reducer } from 'redux';
import createReducerWithInitialState, {
  actionHandler,
} from '../../../../../app/redux/createReducer';
import { Country } from '../../../../../types/Country';
import { fetchedCountriesAction } from '../actions/fetchedCountriesAction';

export const countriesReducer: Reducer<
  Country[]
> = createReducerWithInitialState(
  [],
  actionHandler(fetchedCountriesAction, (_: Country[], subjects: Country[]) => subjects),
);
