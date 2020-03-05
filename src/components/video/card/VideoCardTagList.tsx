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
      {props.video.ageRange && (
        <div className="tag-list__age-container">
          <AgeRangeTag ageRange={props.video.ageRange} />
        </div>
      )}

      {props.video.subjects.length !== 0 && (
        <div className="tag-list__subjects-container">
          {props.video.subjects.map(subject => (
            <SubjectTag subjectName={subject.name} key={subject.id} />
          ))}
        </div>
      )}

      {props.video.bestFor && (
        <div data-qa="best-for-tags" className="tag-list__best-for-container">
          <Tag label="Best for" value={props.video.bestFor} />
        </div>
      )}
    </div>
  </Authenticated>
));

export default VideoCardTagList;
