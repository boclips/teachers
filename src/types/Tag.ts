import { Link } from './Link';

export interface Tag {
  id: string;
  label: string;
  links: TagLinks;
}

export interface TagLinks {
  self: Link;
}
