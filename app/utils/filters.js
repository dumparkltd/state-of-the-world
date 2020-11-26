import { UN_REGIONS } from 'containers/App/constants';

const getAllCountryFilterValues = filter => {
  if (filter === 'unregion') {
    return UN_REGIONS.options;
  }
  return [];
};

export const getFilterOptionValues = filterGroups =>
  filterGroups.reduce(
    (memo, filter) => ({
      [filter]: getAllCountryFilterValues(filter),
      ...memo,
    }),
    {},
  );
