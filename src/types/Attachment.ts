import { Link } from './Link';

export interface Attachment {
  id: string;
  description: string;
  type: 'LESSON_PLAN' | 'ACTIVITY' | 'FINAL_PROJECT';
  links: {
    download: Link;
  };
}
