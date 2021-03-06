import React from 'react';
import { AgeRangeTag } from 'src/components/common/tags/AgeRangeTag';
import { BestForTag } from 'src/components/common/tags/BestForTag';
import { SubjectTag } from 'src/components/common/tags/SubjectTag';
import { Video } from 'src/types/Video';
import { Authenticated } from 'src/components/common/Authenticated/Authenticated';
import './VideoCardTagList.less';
import { AttachmentTag } from 'src/components/common/tags/AttachmentTag';

interface Props {
  video: Video;
}

export const VideoCardTagList = (props: Props) => (
  <Authenticated>
    <div className="tag-list">
      {props.video.ageRange && <AgeRangeTag ageRange={props.video.ageRange} />}
      {props.video.subjects.length > 0 && (
        <SubjectTag
          subjectName={props.video.subjects[0].name}
          key={props.video.subjects[0].id}
        />
      )}
      {props.video.bestFor && <BestForTag value={props.video.bestFor} />}
      {props.video.attachments && props.video.attachments.length > 0 && (
        <AttachmentTag label="Activity" />
      )}
    </div>
  </Authenticated>
);
