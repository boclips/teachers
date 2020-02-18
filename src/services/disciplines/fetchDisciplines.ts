import axios from 'axios';
import { Discipline } from 'src/types/Discipline';
import { Links } from 'src/types/Links';

export function fetchDisciplines(links: Links): Promise<Discipline[]> {
  return axios
    .get(links.disciplines.getOriginalLink())
    .then(response => response.data)
    .then(convertDisciplinesResource);
}

function convertDisciplinesResource(data: any): Discipline[] {
  return data._embedded.disciplines.map(rawDiscipline => ({
    id: rawDiscipline.id,
    code: rawDiscipline.code,
    name: rawDiscipline.name,
    subjects:
      rawDiscipline.subjects &&
      rawDiscipline.subjects.map(rawSubject => ({
        id: rawSubject.id,
        name: rawSubject.name,
        lessonPlan: rawSubject.lessonPlan,
      })),
  }));
}
