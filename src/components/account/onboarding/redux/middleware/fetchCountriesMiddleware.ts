import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import { fetchCountries } from 'src/services/countries/fetchCountries';
import { Country } from 'src/types/Country';
import { Links } from 'src/types/Links';
import { fetchedCountriesAction } from '../actions/fetchedCountriesAction';
import { fetchCountriesAction } from '../actions/fetchCountriesAction';

export function onFetchCountries(store: MiddlewareAPI) {
  const links: Links = store.getState().links.entries;

  fetchCountries(links).then((countries: Country[]) => {
    store.dispatch(fetchedCountriesAction(countries));
  });
}

export default sideEffect(fetchCountriesAction, onFetchCountries);
