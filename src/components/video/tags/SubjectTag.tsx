import { Tag } from 'antd';
import React from 'react';

interface Props {
  subject: string;
}

export default class SubjectTag extends React.Component<Props> {
  public render() {
    return (
      <Tag>
        <span className="tag-type">Subject:</span>
        <span data-qa="video-subject">{this.props.subject}</span>
      </Tag>
    );
  }
}
