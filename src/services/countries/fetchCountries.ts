import axios from 'axios';
import { Country } from '../../types/Country';
import { Links } from '../../types/Links';

export function fetchCountries(links: Links): Promise<Country[]> {
  return axios
    .get(links.countries.getOriginalLink())
    .then(response => response.data)
    .then(convertCountriesResource);
}

function convertCountriesResource(data: any) {
  return data._embedded.countries.map(rawCountry => {
    return { id: rawCountry.id, name: rawCountry.name };
  });
}
