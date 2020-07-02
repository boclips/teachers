import { AttachmentType } from 'boclips-api-client/dist/sub-clients/common/model/Attachment';

const LABELS: { [key in keyof typeof AttachmentType]: AttachmentLabels } = {
  FINAL_PROJECT: {
    title: 'Final project',
    linkLabel: 'Visit project suggestion doc',
  },
  LESSON_PLAN: {
    title: 'Lesson guide outline',
    linkLabel: 'Visit lesson guide',
  },
  ACTIVITY: {
    title: 'Suggested activity',
    linkLabel: 'Visit activity doc',
  },
};

export interface AttachmentLabels {
  title: string;
  linkLabel: string;
}

export const getAttachmentLabels = (
  attachmentType: AttachmentType,
): AttachmentLabels => {
  if (attachmentType === AttachmentType.FINAL_PROJECT) {
    return LABELS.FINAL_PROJECT;
  }
  if (attachmentType === AttachmentType.LESSON_PLAN) {
    return LABELS.LESSON_PLAN;
  }
  if (attachmentType === AttachmentType.ACTIVITY) {
    return LABELS.ACTIVITY;
  }
  throw new Error('Attachment label not found');
};
