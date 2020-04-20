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
      <span>
        {props.video.ageRange && (
          <AgeRangeTag ageRange={props.video.ageRange} />
        )}
        {props.video.subjects.map((subject) => (
          <SubjectTag subjectName={subject.name} key={subject.id} />
        ))}
        {props.video.bestFor && <BestForTag value={props.video.bestFor} />}
      </span>
      {props.video.attachments && props.video.attachments.length > 0 && (
        <AttachmentTag label={'Activity'} />
      )}
    </div>
  </Authenticated>
);
