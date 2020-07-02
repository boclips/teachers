import React from 'react';
import { Tag } from './Tag';

interface Props {
  value: string;
}

export const BestForTag = (props: Props) => (
  <span data-qa="best-for-tag">
    <Tag value={props.value} label="Best for" />
  </span>
);
