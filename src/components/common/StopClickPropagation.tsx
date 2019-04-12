import React from 'react';

interface Props {
  children: React.ReactNode;
}

const onClick = (event: React.MouseEvent) => {
  event.stopPropagation();
};

const StopClickPropagation = (props: Props) => {
  return <div onClick={onClick}>{props.children}</div>;
};

export default StopClickPropagation;
