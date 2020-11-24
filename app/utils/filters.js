import { COLUMNS, INCOME_GROUPS, UN_REGIONS } from 'containers/App/constants';

import {
  getScoresForCountry,
  hasAllScores,
  hasAllCPRScores,
  hasAllESRScores,
  hasSomeScores,
} from 'utils/scores';

export const areAnyFiltersSet = (
  filterGroups,
  {
    // regionFilterValue,
    // subregionFilterValue,
    unRegionFilterValue,
    incomeFilterValue,
  },
) =>
  filterGroups.reduce(
    (memo, filter) =>
      memo ||
      (filter === 'income' && !!incomeFilterValue) ||
      (filter === 'unregion' && !!unRegionFilterValue),
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

// const addCountryAttributeMulti = (values, country, attribute, validValues) => {
//   const value = country[attribute];
//   if (!value) {
//     return values;
//   }
//   const newValues = value.split(',').reduce((memo, v) => {
//     // do not add if already present or invalid
//     if (validValues.indexOf(v) === -1 || values.indexOf(v) > -1) {
//       return memo;
//     }
//     return [v, ...memo];
//   }, []);
//   return [...newValues, ...values];
// };
const addCountryAttributeLookup = (values, country, attribute, validValues) => {
  let value = country[attribute];
  if (!value) {
    return values;
  }
  const group = validValues.find(i => i.value === value);
  value = group && group.key;
  // do not add if already present or invalid
  if (values.indexOf(value) > -1 || !value) {
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
  // if (filter === 'region') {
  //   return countries
  //     .reduce(
  //       (memo, country) =>
  //         addCountryAttribute(
  //           memo,
  //           country,
  //           COLUMNS.COUNTRIES.REGION,
  //           REGIONS.values,
  //         ),
  //       [],
  //     )
  //     .sort((a, b) =>
  //       REGIONS.values.indexOf(a) > REGIONS.values.indexOf(b) ? 1 : -1,
  //     );
  // }
  // if (filter === 'subregion') {
  //   return countries
  //     .reduce(
  //       (memo, country) =>
  //         addCountryAttribute(
  //           memo,
  //           country,
  //           COLUMNS.COUNTRIES.SUBREGION,
  //           SUBREGIONS.values,
  //         ),
  //       [],
  //     )
  //     .sort((a, b) =>
  //       SUBREGIONS.values.indexOf(a) > SUBREGIONS.values.indexOf(b) ? 1 : -1,
  //     );
  // }
  if (filter === 'income') {
    return countries
      .reduce(
        (memo, country) =>
          addCountryAttributeLookup(
            memo,
            country,
            COLUMNS.COUNTRIES.HIGH_INCOME,
            INCOME_GROUPS.values,
          ),
        [],
      )
      .sort((a, b) => {
        const keys = INCOME_GROUPS.values.map(g => g.key);
        return keys.indexOf(a) > keys.indexOf(b) ? 1 : -1;
      });
  }
  return [];
};
const getAllCountryFilterValues = filter => {
  if (filter === 'unregion') {
    return UN_REGIONS.values;
  }
  // if (filter === 'region') {
  //   return REGIONS.values;
  // }
  // if (filter === 'subregion') {
  //   return SUBREGIONS.values;
  // }
  if (filter === 'income') {
    return INCOME_GROUPS.values.map(g => g.key);
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

export const filterByAssessment = (
  country,
  scoresAllCountries,
  filter,
  standard,
) => {
  const countryScores = getScoresForCountry(
    country.country_code,
    scoresAllCountries,
  );
  if (filter[0] === 'all') {
    // true if we have all dimension scores for current standard
    return hasAllScores(countryScores, standard);
  }
  if (filter[0] === 'cpr-all') {
    // true if we have a cpr dimension score
    return hasAllCPRScores(countryScores);
  }
  if (filter[0] === 'esr-all') {
    // true if we have an esr dimension score for current standard
    return hasAllESRScores(countryScores, standard);
  }
  if (filter[0] === 'some') {
    // true if we have any rights score for any standard
    return hasSomeScores(countryScores);
  }
  return true;
};
