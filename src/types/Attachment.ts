import { Link } from './Link';

export type AttachmentType = 'LESSON_PLAN';

export interface Attachment {
  id: string;
  description: string;
  type: AttachmentType;
  links: {
    download: Link;
  };
}
