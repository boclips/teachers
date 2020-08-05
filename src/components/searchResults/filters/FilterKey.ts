export enum FilterKey {
  AGE = 'age',
  DURATION = 'duration',
  RESOURCE = 'resourceTypes',
  SUBJECTS = 'subjects',
}

export const allFilterKeys = Object.keys(FilterKey).map(
  (key) => FilterKey[key],
);
