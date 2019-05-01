import React from 'react';
import './Tag.less';

interface TagProps {
  value: string;
  dataQa: string;
  label: string;
}

export class Tag extends React.Component<TagProps> {
  public render() {
    return (
      <div className="tag">
        <span className="tag__type">{this.props.label}:</span>
        <span data-qa={this.props.dataQa}>{this.props.value}</span>
      </div>
    );
  }
}
