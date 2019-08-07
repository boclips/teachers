import axios from 'axios';
import { Discipline } from '../../types/Discipline';
import { Links } from '../../types/Links';

export function fetchDisciplines(links: Links): Promise<Discipline[]> {
  return axios
    .get(links.disciplines.getOriginalLink())
    .then(response => response.data)
    .then(convertDisciplinesResource);
}

function convertDisciplinesResource(data: any): Discipline[] {
  return data._embedded.disciplines.map(rawDiscipline => {
    return {
      id: rawDiscipline.id,
      code: rawDiscipline.code,
      name: rawDiscipline.name,
      subjects:
        rawDiscipline.subjects &&
        sortSubjects(
          rawDiscipline.subjects.map(rawSubject => {
            return { id: rawSubject.id, name: rawSubject.name };
          }),
        ),
    };
  });
}

function sortSubjects(subjects) {
  return [...subjects].sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
}
