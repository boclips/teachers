import React from 'react';
import { Video } from '../../../types/Video';
import StopClickPropagation from '../../common/StopClickPropagation';
import { SubjectTag } from '../tags/SubjectTag';
import { Tag } from '../tags/Tag';
import './VideoCardTagList.less';

interface Props {
  video: Video;
}

const VideoCardTagList = React.memo((props: Props) => (
  <div className="tag-list">
    {props.video.subjects.length !== 0 && (
      <div className="tag-list__subjects-container">
        {props.video.subjects.map(subject => (
          <StopClickPropagation key={subject.name}>
            <SubjectTag subjectName={subject.name} subjectId={subject.id} />
          </StopClickPropagation>
        ))}
      </div>
    )}

    {props.video.bestFor && (
      <div data-qa="best-for-tags" className="tag-list__best-for-container">
        <Tag label="Best for" value={props.video.bestFor} />
      </div>
    )}
  </div>
));

export default VideoCardTagList;
