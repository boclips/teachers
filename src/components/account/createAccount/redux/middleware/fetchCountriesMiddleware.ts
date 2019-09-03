import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../../app/redux/actions';
import { fetchCountries } from '../../../../../services/countries/fetchCountries';
import { Country } from '../../../../../types/Country';
import State from '../../../../../types/State';
import { fetchCountriesAction } from '../actions/fetchCountriesAction';
import { fetchedCountriesAction } from '../actions/fetchedCountriesAction';

export function onFetchCountries(store: MiddlewareAPI) {
  const state: State = store.getState();

  fetchCountries(state.links).then((countries: Country[]) => {
    store.dispatch(fetchedCountriesAction(countries));
  });
}

export default sideEffect(fetchCountriesAction, onFetchCountries);
