import React from 'react';

interface Props {
  className: string;
  href: string;
  children: React.ReactNode;
}

const BlankTargetLink = React.memo((props: Props) => (
  <a
    rel="noopener noreferrer"
    className={props.className}
    href={props.href}
    target="_blank"
  >
    {props.children}
  </a>
));

export default BlankTargetLink;
