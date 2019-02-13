import React from 'react';
import './SubjectTag.less';

interface Props {
  subject: string;
}

export default class SubjectTag extends React.Component<Props> {
  public render() {
    return (
      <div className="subject-tag">
        <span className="tag-type">Subject:</span>
        <span data-qa="video-subject">{this.props.subject}</span>
      </div>
    );
  }
}
