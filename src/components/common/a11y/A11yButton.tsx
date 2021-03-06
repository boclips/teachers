import React from 'react';

export interface Props {
  disableClick?: boolean;
  callback: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;
  children: React.ReactElement | React.ReactElement[];
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
export const A11yButton = ({ callback, children, disableClick }: Props) => {
  const childComponents: React.ReactElement[] = Array.isArray(children)
    ? children
    : [children];

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

      childComponents.forEach((child) => {
        if (child.props.onKeyDown) {
          child.props.onKeyDown(event);
        }
      });
    }

    return true;
  };

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!disableClick) {
      callback(event);
    }

    childComponents.forEach((child) => {
      if (child.props.onClick) {
        child.props.onClick(event);
      }
    });
  };

  return (
    <>
      {childComponents.map((child) =>
        React.cloneElement(child, {
          onClick,
          onKeyDown,
          role: 'button',
          key: child.props['data-qa'],
        }),
      )}
    </>
  );
};
