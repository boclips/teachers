import Tag from 'antd/lib/Tag';
import React from 'react';

interface Props {
  subject: string;
}

export default class SubjectTag extends React.Component<Props> {
  public render() {
    return (
      <Tag>
        <span className="tag-type">Subject:</span>
        <span data-qa="video-details-subject">{this.props.subject}</span>
      </Tag>
    );
  }
}
