import { useEffect } from 'react';

const MockLazyLoad = ({ children, onContentVisible }) => {
  useEffect(() => {
    onContentVisible();
  }, [onContentVisible]);

  return children;
};

export default MockLazyLoad;
