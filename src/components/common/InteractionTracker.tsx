import React from 'react';

interface Props {
  onInteraction: () => void;
  children: React.ReactNode;
}

const MAIN_BUTTON = 0;

export const InteractionTracker = (props: Props) => {
  const handleMouseDown = (e) => {
    if (e.button !== MAIN_BUTTON) {
      props.onInteraction();
    }
  };

  return (
    <div onMouseDown={handleMouseDown} onClick={props.onInteraction}>
      {props.children}
    </div>
  );
};
