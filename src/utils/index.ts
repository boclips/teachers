import classnames from 'classnames';
import queryString from 'query-string';

export const noOp: (args?: any) => any = () => {};

export const generateBorderRadiusClassNames = (
  currentIndex,
  columnCount,
  sizeOfArray,
) =>
  classnames({
    'border-radius--first': currentIndex === 0,
    'border-radius--top-left': currentIndex === 0,
    'border-radius--top-right': currentIndex === columnCount - 1,
    'border-radius--bottom-left':
      currentIndex ===
      Math.ceil(sizeOfArray / columnCount) * columnCount - columnCount,
    'border-radius--bottom-right':
      currentIndex === Math.ceil(sizeOfArray / columnCount) * columnCount - 1,
    'border-radius--last': currentIndex === sizeOfArray - 1,
  });

export const generateUri = (path: string, query: any): string => {
  if (!path) {
    return '';
  }

  if (query) {
    return `${path}?${queryString.stringify(query)}`;
  }

  return path;
};
