import axios from 'axios';
import { Links } from '../../types/Links';
import { Subject } from '../../types/Subject';

export function fetchSubjects(links: Links): Promise<Subject[]> {
  if (!links.subjects) {
    return Promise.reject();
  }

  return axios
    .get(links.subjects.getOriginalLink())
    .then(response => response.data)
    .then(convertSubjectsResource);
}

function convertSubjectsResource(data: any) {
  return data._embedded.subjects.map(rawSubject => {
    return { id: rawSubject.id, name: rawSubject.name };
  });
}
