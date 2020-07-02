export const setWidth = (x) => {
  // @ts-ignore
  window.innerWidth = x;
  window.dispatchEvent(new Event('resize'));
};
