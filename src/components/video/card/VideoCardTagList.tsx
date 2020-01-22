import React from 'react';
import { Video } from '../../../types/Video';
import { SubjectTag } from '../../common/tags/SubjectTag';
import { Tag } from '../../common/tags/Tag';
import './VideoCardTagList.less';

interface Props {
  video: Video;
}

const VideoCardTagList = React.memo((props: Props) => (
  <div className="tag-list">
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
));

export default VideoCardTagList;
