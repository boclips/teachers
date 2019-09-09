import axios from 'axios';
import { Country } from '../../types/Country';
import { School } from '../../types/School';

export function searchSchools(
  query: string,
  country: Country,
): Promise<School[]> {
  return axios
    .get(country.links.schools.getTemplatedLink({ query }))
    .then(response => response.data)
    .then(convertSchoolsResource);
}

function convertSchoolsResource(data: any): School[] {
  return (
    (data._embedded &&
      data._embedded.schools &&
      data._embedded.schools.map(rawSchool => {
        return { id: rawSchool.id, name: rawSchool.name };
      })) ||
    []
  );
}
