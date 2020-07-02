import React from 'react';

export const CopyToClipboard = (props) => (
  <div onClick={props.onCopy}>{props.children}</div>
);
