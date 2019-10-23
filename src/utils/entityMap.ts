export const organizeById = <T extends { id: string }>(
  collections: T[],
): { [key: string]: T } =>
  collections.reduce((result, collection) => {
    result[collection.id] = collection;
    return result;
  }, {});
