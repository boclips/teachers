import { AttachmentType } from 'boclips-api-client/dist/sub-clients/common/model/Attachment';

const PARENT_COLLECTION_LABELS: AttachmentLabels = {
  title: 'Final project',
  linkLabel: 'Visit project suggestion doc',
};

const SIMPLE_COLLECTION_LABELS: AttachmentLabels = {
  title: 'Lesson guide outline',
  linkLabel: 'Visit lesson guide',
};

const VIDEO_LABELS: AttachmentLabels = {
  title: 'Suggested activity',
  linkLabel: 'Visit activity doc',
};

export interface AttachmentLabels {
  title: string;
  linkLabel: string;
}

export const getAttachmentLabels = (
  attachmentType: AttachmentType,
  isParentCollection?: boolean,
): AttachmentLabels => {
  if (isParentCollection) {
    return PARENT_COLLECTION_LABELS;
  }
  if (attachmentType === AttachmentType.LESSON_PLAN) {
    return SIMPLE_COLLECTION_LABELS;
  }
  if (attachmentType === AttachmentType.ACTIVITY) {
    return VIDEO_LABELS;
  }
};
