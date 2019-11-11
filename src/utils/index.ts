import classnames from 'classnames';

export const noOp: (args?: any) => any = () => {};

export const generateBorderRadiusClassNames = (
  currentIndex,
  columnCount,
  sizeOfArray,
) =>
  classnames({
    'border-radius--top-left': currentIndex === 0,
    'border-radius--top-right': currentIndex === columnCount - 1,
    'border-radius--bottom-left':
      currentIndex ===
      Math.ceil(sizeOfArray / columnCount) * columnCount - columnCount,
    'border-radius--bottom-right':
      currentIndex === Math.ceil(sizeOfArray / columnCount) * columnCount - 1,
  });
