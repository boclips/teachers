import React from 'react';
import './A11ySkipLink.less';
import { Link } from 'react-router-dom';

interface Props {
  hash: string;
  children: React.ReactNode;
}

export const A11ySkipLink = (props: Props) => (
  <Link
    className="a11y-skip-link"
    tabIndex={0}
    to={location => ({ ...location, hash: props.hash })}
  >
    {props.children}
  </Link>
);
