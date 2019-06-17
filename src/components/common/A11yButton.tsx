import React from 'react';

export interface Props {
  callback: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;
  children: React.ReactElement;
}

/**
 * This component is designed to wrap an element that should be accessible.
 *
 * A user may interact with the website only using the keyboard, therefore callback functions are not going to work for
 * them.
 *
 * A <button> element will call the callback function when it receives an enter or space press, but other things like
 * images, svgs, etc may not.
 *
 * @param onClick
 * @param children
 * @constructor
 */
export const A11yButton = ({ callback, children }: Props) => {
  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (
      event.key === ' ' ||
      event.key === 'Enter' ||
      event.key === 'Spacebar'
    ) {
      // "Spacebar" for IE11 support
      // Prevent the default action to stop scrolling when space is pressed
      event.preventDefault();

      callback(event);
      if (children.props.onKeyDown) {
        children.props.onKeyDown(event);
      }
    }
    return true;
  };

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    callback(event);
    if (children.props.onClick) {
      children.props.onClick(event);
    }
  };
  return React.cloneElement(children, { onClick, onKeyDown, role: 'button' });
};
