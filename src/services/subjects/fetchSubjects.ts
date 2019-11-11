import axios from 'axios';
import { Links } from '../../types/Links';
import { Subject } from '../../types/Subject';

export function fetchSubjects(links: Links): Promise<Subject[]> {
  return axios
    .get(links.subjects.getOriginalLink())
    .then(response => response.data._embedded.subjects)
    .then(rawSubjects => rawSubjects.map(convertSubjectResource));
}

export function convertSubjectResource(rawSubject: any): Subject {
  return {
    id: rawSubject.id,
    name: rawSubject.name,
    lessonPlan: rawSubject.lessonPlan,
  };
}
