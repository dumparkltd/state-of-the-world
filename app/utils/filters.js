import { COLUMNS, UN_REGIONS } from 'containers/App/constants';

export const areAnyFiltersSet = (filterGroups, { unRegionFilterValue }) =>
  filterGroups.reduce(
    (memo, filter) => memo || (filter === 'unregion' && !!unRegionFilterValue),
    false,
  );

const addCountryAttribute = (values, country, attribute, validValues) => {
  const value = country[attribute];
  // do not add if already present or invalid
  if (
    !value ||
    values.indexOf(value) > -1 ||
    validValues.indexOf(value) === -1
  ) {
    return values;
  }
  return [value, ...values];
};

const getCountryFilterValues = (countries, filter) => {
  if (filter === 'unregion') {
    return countries
      .reduce(
        (memo, country) =>
          addCountryAttribute(
            memo,
            country,
            COLUMNS.COUNTRIES.UN_REGION,
            UN_REGIONS.values,
          ),
        [],
      )
      .sort((a, b) =>
        UN_REGIONS.values.indexOf(a) > UN_REGIONS.values.indexOf(b) ? 1 : -1,
      );
  }
  return [];
};
const getAllCountryFilterValues = filter => {
  if (filter === 'unregion') {
    return UN_REGIONS.values;
  }
  return [];
};

export const getFilterOptionValues = (
  countries,
  filterGroups,
  anyFilterSet = true,
  standard,
  scoresAllCountries,
) =>
  filterGroups.reduce((memo, filter) => {
    // prettier-ignore
    const values = anyFilterSet
      ? getCountryFilterValues(
        countries,
        filter,
        standard,
        scoresAllCountries,
      )
      : getAllCountryFilterValues(filter);
    return {
      [filter]: values,
      ...memo,
    };
  }, {});
