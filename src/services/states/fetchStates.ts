import axios from 'axios';
import { Country } from '../../types/Country';
import { UsaState } from '../../types/UsaState';

export function fetchStates(country: Country): Promise<UsaState[]> {
  return axios
    .get(country.links.states.getOriginalLink())
    .then(response => response.data)
    .then(convertStatesResource);
}

function convertStatesResource(data: any): UsaState[] {
  return (
    (data._embedded &&
      data._embedded.states &&
      data._embedded.states.map(rawState => {
        return { id: rawState.id, name: rawState.name };
      })) ||
    []
  );
}
