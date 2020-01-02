import { Icon } from 'antd';
import React from 'react';
import CloseSVG from '../../../../resources/images/close.svg';
import './Tag.less';

interface TagProps {
  value: string;
  label?: string;
}

export class Tag extends React.Component<TagProps> {
  public render() {
    return (
      <div className="tag">
        {this.props.label && (
          <span className="tag__type">{this.props.label}:</span>
        )}
        <span data-qa={'filter-tag'}>{this.props.value}</span>
      </div>
    );
  }
}

interface ClosableTagProps extends TagProps {
  onClose: () => void;
}

export class ClosableTag extends React.Component<ClosableTagProps> {
  public render() {
    return (
      <div className="tag">
        {this.props.label && (
          <span className="tag__type">{this.props.label}:</span>
        )}
        <span data-qa="filter-tag">{this.props.value}</span>
        <span
          className="tag__close"
          data-qa="close-tag"
          onClick={this.props.onClose}
        >
          <Icon component={CloseSVG} />
        </span>
      </div>
    );
  }
}
