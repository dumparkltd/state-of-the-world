import { UN_REGIONS } from 'containers/App/constants';

const getAllCountryFilterValues = (filter, config) => {
  if (filter === 'unregion') {
    if (config && config.unregion === 'all') {
      return UN_REGIONS.options;
    }
    return UN_REGIONS.options.filter(o => o.key !== 'all');
  }
  return [];
};

export const getFilterOptionValues = (filterGroups, config) =>
  filterGroups.reduce(
    (memo, filter) => ({
      [filter]: getAllCountryFilterValues(filter, config),
      ...memo,
    }),
    {},
  );
