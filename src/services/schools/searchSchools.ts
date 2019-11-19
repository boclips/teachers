import axios from 'axios';
import { Country } from '../../types/Country';
import { School } from '../../types/School';
import { UsaState } from '../../types/UsaState';

export function searchSchools(
  query: string,
  country: Country,
  state?: UsaState,
): Promise<School[]> {
  return axios
    .get(
      country.links.schools.getTemplatedLink({
        query,
        state: state ? state.id : undefined,
      }),
    )
    .then(response => response.data)
    .then(convertSchoolsResource);
}

function convertSchoolsResource(data: any): School[] {
  return (
    (data._embedded &&
      data._embedded.schools &&
      data._embedded.schools.map(rawSchool => ({ id: rawSchool.id, name: rawSchool.name }))) ||
    []
  );
}
