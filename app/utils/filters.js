import { UN_REGIONS } from 'containers/App/constants';

const getAllCountryFilterValues = (filter, config) => {
  if (filter === 'unregion' && config.attribute === 'unregion') {
    if (config && config.all) {
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
