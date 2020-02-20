import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../../app/redux/actions';
import { fetchCountries } from '../../../../../services/countries/fetchCountries';
import { Country } from '../../../../../types/Country';
import { fetchCountriesAction } from '../actions/fetchCountriesAction';
import { fetchedCountriesAction } from '../actions/fetchedCountriesAction';
import { Links } from '../../../../../types/Links';

export function onFetchCountries(store: MiddlewareAPI) {
  const links: Links = store.getState().links.entries;

  fetchCountries(links).then((countries: Country[]) => {
    store.dispatch(fetchedCountriesAction(countries));
  });
}

export default sideEffect(fetchCountriesAction, onFetchCountries);
