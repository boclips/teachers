import { Subject } from './Subject';

export interface Discipline {
  id: string;
  name: string;
  code: string;
  subjects: Subject[];
}
