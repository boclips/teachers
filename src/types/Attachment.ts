import { Link } from './Link';

export interface Attachment {
  id: string;
  description: string;
  type: 'LESSON_PLAN' | 'ACTIVITY';
  links: {
    download: Link;
  };
}
