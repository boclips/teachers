import React from 'react';
import { Subject } from 'src/types/Subject';
import { Badge } from 'src/views/bit/badge';
import s from './style.module.less';

interface SubjectBadgeProps {
  subject: Subject;
}
export const SubjectBadge = ({ subject }: SubjectBadgeProps) => (
  <div className={s.subjectBadge} data-qa="subject-badge">
    <Badge value={subject.name} label="Subject:" />
  </div>
);
