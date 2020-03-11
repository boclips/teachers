import React from 'react';
import { AgeRangeTag } from 'src/components/common/tags/AgeRangeTag';
import { Video } from 'src/types/Video';
import { Authenticated } from 'src/components/common/Authenticated/Authenticated';
import { SubjectTag } from '../../common/tags/SubjectTag';
import { Tag } from '../../common/tags/Tag';
import './VideoCardTagList.less';

interface Props {
  video: Video;
}

const VideoCardTagList = React.memo((props: Props) => (
  <Authenticated>
    <div className="tag-list">
      {props.video.ageRange && <AgeRangeTag ageRange={props.video.ageRange} />}
      {props.video.subjects.map(subject => (
        <SubjectTag subjectName={subject.name} key={subject.id} />
      ))}
      {props.video.bestFor && (
        <Tag label="Best for" value={props.video.bestFor} />
      )}
    </div>
  </Authenticated>
));

export default VideoCardTagList;
