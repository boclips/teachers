import Icon from '@ant-design/icons';
import React from 'react';
import CloseSVG from '../../../../resources/images/close.svg';
import './Tag.less';

interface TagProps {
  value: string;
  label?: string;
}

export const Tag = (props: TagProps) => {
  return (
    <div className="tag">
      {props.label && <span className="tag__type">{props.label}:</span>}
      <span data-qa="filter-tag">{props.value}</span>
    </div>
  );
};

interface ClosableTagProps extends TagProps {
  onClose: () => void;
}

export const ClosableTag = (props: ClosableTagProps) => {
  return (
    <div className="tag">
      {props.label && <span className="tag__type">{props.label}:</span>}
      <span data-qa="filter-tag">{props.value}</span>
      <span
        role="button"
        tabIndex={0}
        className="tag__close"
        data-qa="close-tag"
        onKeyPress={(e) => (e.keyCode === 13 ? props.onClose : null)}
        onClick={props.onClose}
      >
        <Icon component={CloseSVG} />
      </span>
    </div>
  );
};
