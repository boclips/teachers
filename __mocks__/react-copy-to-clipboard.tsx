import React from 'react';

export const CopyToClipboard = (props) => (
  // eslint-disable-next-line
  <div onClick={props.onCopy}>{props.children}</div>
);
