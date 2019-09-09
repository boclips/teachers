import { Link } from './Link';

export interface Country {
  id: string;
  name: string;
  links: CountryLinks;
}

export interface CountryLinks {
  schools: Link;
  states?: Link;
}
