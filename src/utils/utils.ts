export const filterObjFields = (
  obj: Record<string, any>,
  fieldToDelete: string,
) => {
  return Object.keys(obj)
    .filter((field) => field !== fieldToDelete)
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
};
