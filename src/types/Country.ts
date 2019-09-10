import { Link } from './Link';
import { UsaState } from './UsaState';

export interface Country {
  id: string;
  name: string;
  states?: UsaState[];
  links: CountryLinks;
}

export interface CountryLinks {
  schools: Link;
  states?: Link;
}
