import axios from 'axios';
import { Country } from 'src/types/Country';
import { Link } from 'src/types/Link';
import { Links } from 'src/types/Links';

export function fetchCountries(links: Links): Promise<Country[]> {
  return axios
    .get(links.countries.getOriginalLink())
    .then(response => response.data)
    .then(convertCountriesResource);
}

function convertCountriesResource(data: any): Country[] {
  return data._embedded.countries.map(rawCountry => ({
    id: rawCountry.id,
    name: rawCountry.name,
    states: rawCountry.states,
    links: { schools: new Link(rawCountry._links.schools) },
  }));
}
