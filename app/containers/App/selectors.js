/**
 * The global and router state selectors
 */

import { createSelector } from 'reselect';
import { groupBy, map } from 'lodash/collection';
import { DEFAULT_LOCALE, appLocales } from 'i18n';
import 'url-search-params-polyfill';

import isInteger from 'utils/is-integer';
import quasiEquals from 'utils/quasi-equals';

import getMetricDetails from 'utils/metric-details';

import { hasCountryIncome } from 'utils/countries';

import { initialState } from './reducer';
import {
  STANDARDS,
  BENCHMARKS,
  UN_REGIONS,
  COUNTRY_SORTS,
  INCOME_GROUPS,
  DIMENSIONS,
  RIGHTS,
  PEOPLE_GROUPS,
  COLUMNS,
} from './constants';

// global sub-state
const getGlobal = state => state.global || initialState;

export const getCloseTargetPage = createSelector(
  getGlobal,
  global => global.closeTargetPage,
);
export const getCloseTargetMetric = createSelector(
  getGlobal,
  global => global.closeTargetMetric,
);
export const getCloseTargetCountry = createSelector(
  getGlobal,
  global => global.closeTargetCountry,
);

// get data / content
const getData = createSelector(
  getGlobal,
  global => global.data,
);
export const getESRScores = createSelector(
  getData,
  data => data.esrScores,
);
export const getCPRScores = createSelector(
  getData,
  data => data.cprScores,
);
export const getAuxIndicators = createSelector(
  getData,
  data => data.auxIndicators,
);
export const getCountries = createSelector(
  getData,
  data => data.countries,
);
export const getCountriesGrammar = createSelector(
  getData,
  data => data.countriesGrammar,
);
export const getSources = createSelector(
  getData,
  data => data.sources,
);

// router sub-state
const getRouter = state => state.router;

export const getRouterLocation = createSelector(
  getRouter,
  routerState => routerState.location,
);
export const getRouterSearchParams = createSelector(
  getRouterLocation,
  location => location && new URLSearchParams(location.search),
);
export const getRouterPath = createSelector(
  getRouterLocation,
  location => location && location.pathname,
);
/**
 * Get the language locale
 */
export const getLocale = createSelector(
  getRouterPath,
  path => {
    if (path) {
      const splitPath = path.split('/');
      return splitPath.length > 1 && appLocales.indexOf(splitPath[1]) >= 0
        ? splitPath[1]
        : DEFAULT_LOCALE;
    }
    return DEFAULT_LOCALE;
  },
);

export const getRouterRoute = createSelector(
  getRouterPath,
  path => {
    if (path) {
      const splitPath = path.split('/');
      // should result in ["", "en", "page", "about"]
      return splitPath.length > 2 ? splitPath[2] : '';
    }
    return '';
  },
);
export const getRouterMatch = createSelector(
  getRouterPath,
  path => {
    if (path) {
      const splitPath = path.split('/');
      // should result in ["", "en", "page", "about"]
      return splitPath.length > 3 ? splitPath[3] : '';
    }
    return '';
  },
);

export const getTabSearch = createSelector(
  getRouterSearchParams,
  search => (search.has('tab') ? search.get('tab') : '0'),
);
export const getAtRiskSearch = createSelector(
  getRouterSearchParams,
  search => search.has('atRisk') && search.get('atRisk'),
);

export const getBenchmarkSearch = () => BENCHMARKS[0].key;

export const getYearESRSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('yesr') && isInteger(search.get('yesr'))
      ? search.get('yesr')
      : false,
);
export const getYearCPRSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('ycpr') && isInteger(search.get('ycpr'))
      ? search.get('ycpr')
      : false,
);

const searchValues = (validValues, search) => {
  const validSearchValues = search.filter(s => validValues.indexOf(s) > -1);
  return validSearchValues.length > 0 && validSearchValues;
};

export const getUNRegionSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('unregion') &&
    searchValues(UN_REGIONS.values, search.getAll('unregion')),
);

export const getIncomeSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('income') &&
    searchValues(INCOME_GROUPS.values.map(s => s.key), search.getAll('income')),
);

const getHasChartSettingFilters = createSelector(
  getUNRegionSearch,
  getIncomeSearch,
  (unregion, income) => unregion || income,
);
export const getSortSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('sort') &&
    Object.keys(COUNTRY_SORTS).indexOf(search.get('sort')) > -1 &&
    search.get('sort'),
);
export const getSortOrderSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('dir') &&
    ['asc', 'desc'].indexOf(search.get('dir')) > -1 &&
    search.get('dir'),
);

// data / content
const getContent = createSelector(
  getGlobal,
  global => global.content,
);
export const getContentByKey = createSelector(
  (state, key) => key,
  getContent,
  (key, content) => content[key],
);
export const getDataByKey = createSelector(
  (state, key) => key,
  getData,
  (key, data) => data[key],
);

const getContentRequested = createSelector(
  getGlobal,
  global => global.contentRequested,
);

const getDataRequested = createSelector(
  getGlobal,
  global => global.dataRequested,
);
const getContentReady = createSelector(
  getGlobal,
  global => global.contentReady,
);

const getDataReady = createSelector(
  getGlobal,
  global => global.dataReady,
);
// requested data / content
export const getDataRequestedByKey = createSelector(
  (state, key) => key,
  getDataRequested,
  (key, requested) => requested[key],
);
export const getContentRequestedByKey = createSelector(
  (state, key) => key,
  getContentRequested,
  (key, requested) => requested[key],
);
// requested data / content
export const getDataReadyByKey = createSelector(
  (state, key) => key,
  getDataReady,
  (key, ready) => ready[key],
);
export const getContentReadyByKey = createSelector(
  (state, key) => key,
  getContentReady,
  (key, ready) => ready[key],
);

// helper functions
// TERRIBLE PERFORMANCE ON EDGE AND IE11
// const sortByNumber = (data, column, asc = true) => {
//   const reverse = asc ? 1 : -1;
//   return data.sort(
//     (a, b) =>
//       reverse * (parseInt(a[column], 10) < parseInt(b[column], 10) ? 1 : -1),
//   );
// };

// prettier-ignore
const calcMaxYear = scores =>
  scores &&
  scores.length > 0 &&
  scores.reduce(
    (max, s) => (parseInt(s.year, 10) > max ? parseInt(s.year, 10) : max),
    0,
  ).toString();

// prettier-ignore
const calcMinYear = scores =>
  scores &&
  scores.length > 0 &&
  scores.reduce(
    (min, s) => (parseInt(s.year, 10) < min ? parseInt(s.year, 10) : min),
    9999,
  ).toString();

export const getMaxYearESR = createSelector(
  getESRScores,
  scores => calcMaxYear(scores),
);
export const getMinYearESR = createSelector(
  getESRScores,
  scores => calcMinYear(scores),
);
export const getMaxYearCPR = createSelector(
  getCPRScores,
  scores => calcMaxYear(scores),
);
export const getMinYearCPR = createSelector(
  getCPRScores,
  scores => calcMinYear(scores),
);
export const getESRYear = createSelector(
  getYearESRSearch,
  getMaxYearESR,
  (searchYear, maxYear) => parseInt(searchYear || maxYear, 10),
);
export const getCPRYear = createSelector(
  getYearCPRSearch,
  getMaxYearCPR,
  (searchYear, maxYear) => parseInt(searchYear || maxYear, 10),
);

// get data by code
export const getCountry = createSelector(
  (store, code) => code,
  getCountries,
  (code, countries) =>
    countries && countries.find(c => c.country_code === code),
);
// get data by code
export const getCountryGrammar = createSelector(
  (store, code) => code,
  getCountriesGrammar,
  (code, countries) =>
    countries && countries.find(c => c.country_code === code),
);

// N.B. moved down here to use getCountry
export const getStandardSearch = createSelector(
  getRouterSearchParams,
  getCountry,
  (search, country) => {
    // TODO: not an ideal solution to get the default AS per country if no query param supplied, but workable
    const noCode = country
      ? STANDARDS.find(s => country.high_income_country === s.hiValue).key
      : STANDARDS[0].key;
    return search.has('as') &&
      STANDARDS.map(s => s.key).indexOf(search.get('as')) > -1
      ? search.get('as')
      : noCode;
  },
);

export const getCountriesFiltered = createSelector(
  getCountries,
  getUNRegionSearch,
  getIncomeSearch,
  (countries, unregion, income) =>
    countries &&
    countries
      .filter(
        c => !unregion || unregion.indexOf(c[COLUMNS.COUNTRIES.UN_REGION]) > -1,
      )
      .filter(c => !income || hasCountryIncome(c, income)),
);

// single right, multiple countries, single year
export const getESRRightScores = createSelector(
  (state, metric) => metric,
  getESRScores,
  getCountriesFiltered,
  getHasChartSettingFilters,
  getStandardSearch,
  getESRYear,
  (metric, scores, countries, hasChartSettingFilters, standardSearch, year) => {
    const standard = STANDARDS.find(as => as.key === standardSearch);
    const group = PEOPLE_GROUPS[0];
    const right = !!metric && RIGHTS.find(d => d.key === metric);
    const countryCodes = countries ? countries.map(c => c.country_code) : [];
    return (
      scores &&
      countries &&
      right &&
      scores.filter(
        s =>
          s.group === group.code &&
          s.standard === standard.code &&
          s.metric_code === right.code &&
          quasiEquals(s.year, year) &&
          countryCodes.indexOf(s.country_code) > -1,
      )
    );
  },
);

// single right, multiple countries, single year
export const getCPRRightScores = createSelector(
  (state, metric) => metric,
  getCPRScores,
  getCountriesFiltered,
  getHasChartSettingFilters,
  getCPRYear,
  (metric, scores, countries, hasChartSettingFilters, year) => {
    const right = !!metric && RIGHTS.find(d => d.key === metric);
    const countryCodes = countries ? countries.map(c => c.country_code) : [];
    return (
      scores &&
      countries &&
      right &&
      scores.filter(
        s =>
          s.metric_code === right.code &&
          quasiEquals(s.year, year) &&
          countryCodes.indexOf(s.country_code) > -1,
      )
    );
  },
);

// single metric, single country, multipleYears

export const getCPRScoresForCountry = createSelector(
  (state, { countryCode }) => countryCode,
  (state, { metric }) => metric,
  getCPRScores,
  (countryCode, metric, scores) =>
    scores &&
    scores.filter(
      s => s.country_code === countryCode && s.metric_code === metric.code,
    ),
);

export const getHasCountryCPR = createSelector(
  (state, countryCode) => countryCode,
  getCPRScores,
  (countryCode, scores) =>
    scores && !!scores.find(s => s.country_code === countryCode),
);

export const getESRScoresForCountry = createSelector(
  (state, { countryCode }) => countryCode,
  (state, { metric }) => metric,
  getESRScores,
  getStandardSearch,
  (countryCode, metric, scores, standardSearch) => {
    const standard = STANDARDS.find(as => as.key === standardSearch);
    return (
      scores &&
      scores.filter(
        s =>
          s.country_code === countryCode &&
          s.metric_code === metric.code &&
          s.standard === standard.code,
      )
    );
  },
);

export const getESRScoreForCountry = createSelector(
  (state, { countryCode }) => countryCode,
  (state, { metricCode }) => metricCode,
  getESRScores,
  getESRYear,
  getStandardSearch,
  (countryCode, metricCode, scores, esrYear, standardSearch) => {
    const standard = STANDARDS.find(as => as.key === standardSearch);
    const right = RIGHTS.find(r => r.key === metricCode);
    return (
      countryCode &&
      scores &&
      scores.find(
        s =>
          s.country_code === countryCode &&
          s.metric_code === right.code &&
          s.standard === standard.code &&
          quasiEquals(s.year, esrYear),
      )
    );
  },
);

// single country, all rights, single year
export const getRightScoresForCountry = createSelector(
  (state, country) => country,
  getESRScores,
  getCPRScores,
  getESRYear,
  getCPRYear,
  (country, esrScores, cprScores, esrYear, cprYear) => {
    const rightsESR = RIGHTS.filter(d => d.type === 'esr').map(d => d.code);
    const rightsCPR = RIGHTS.filter(d => d.type === 'cpr').map(d => d.code);
    return (
      country &&
      esrScores &&
      cprScores && {
        esr: esrScores.filter(
          s =>
            s.country_code === country &&
            quasiEquals(s.year, esrYear) &&
            rightsESR.indexOf(s.metric_code) > -1,
        ),
        cpr: cprScores.filter(
          s =>
            s.country_code === country &&
            quasiEquals(s.year, cprYear) &&
            rightsCPR.indexOf(s.metric_code) > -1,
        ),
      }
    );
  },
);

export const getRightsForCountry = createSelector(
  getRightScoresForCountry,
  getStandardSearch,
  (scores, standard) => {
    const standardCode = STANDARDS.find(as => as.key === standard).code;
    return (
      scores &&
      RIGHTS.reduce((memo, r) => {
        if (r.type === 'cpr') {
          return {
            [r.key]: {
              score: scores.cpr.find(s => s.metric_code === r.code),
              ...r,
            },
            ...memo,
          };
        }
        // esr
        const score = scores.esr.find(
          s =>
            s.standard === standardCode &&
            s.metric_code === r.code &&
            s.group === PEOPLE_GROUPS[0].code,
        );
        if (score) {
          return {
            [r.key]: {
              score,
              ...r,
            },
            ...memo,
          };
        }

        return {
          [r.key]: {
            score: false,
            hasScoreAlternate: !!scores.esr.find(
              s => s.standard !== standardCode && s.metric_code === r.code,
            ),
            ...r,
          },
          ...memo,
        };
      }, {})
    );
  },
);

export const getCountryFromRouter = createSelector(
  getRouterMatch,
  getCountries,
  (code, countries) =>
    countries && countries.find(c => c.country_code === code),
);

const filterScoresByYear = (year, scores) =>
  !!scores && scores.filter(s => quasiEquals(s.year, year));

export const getESRScoresForYear = createSelector(
  getESRYear,
  getESRScores,
  (year, scores) => filterScoresByYear(year, scores),
);
export const getCPRScoresForYear = createSelector(
  getCPRYear,
  getCPRScores,
  (year, scores) => filterScoresByYear(year, scores),
);

// All countries
const scoresByCountry = scores =>
  !!scores &&
  scores.reduce((memo, score) => {
    const metricR = RIGHTS.find(r => r.code === score.metric_code);
    const metricD = DIMENSIONS.find(d => d.code === score.metric_code);
    const metric = metricR || metricD;
    if (!metric) return memo;
    const memoCountry = memo[score.country_code];
    if (memoCountry) {
      const memoCountryMetric = memoCountry[metric.key];
      if (memoCountryMetric) {
        return {
          ...memo,
          [score.country_code]: {
            ...memoCountry,
            [metric.key]: [...memoCountryMetric, score],
          },
        };
      }
      return {
        ...memo,
        [score.country_code]: {
          ...memoCountry,
          [metric.key]: [score],
        },
      };
    }
    return {
      ...memo,
      [score.country_code]: {
        [metric.key]: [score],
      },
    };
  }, {});

export const getESRScoresByCountry = createSelector(
  getESRScoresForYear,
  scores => scoresByCountry(scores, 'esr'),
);

export const getCPRScoresByCountry = createSelector(
  getCPRScoresForYear,
  scores => scoresByCountry(scores, 'cpr'),
);

export const getScoresByCountry = createSelector(
  getESRScoresByCountry,
  getCPRScoresByCountry,
  (esr, cpr) => ({
    esr,
    cpr,
  }),
);

export const getNumberCountriesWithScores = createSelector(
  getCountries,
  getESRScoresByCountry,
  getCPRScoresByCountry,
  (countries, esr, cpr) => {
    if (!countries || !esr || !cpr) return 0;
    const countriesWithRightsScores = countries.filter(
      c =>
        Object.keys(cpr).indexOf(c[COLUMNS.COUNTRIES.CODE]) > -1 ||
        Object.keys(esr).indexOf(c[COLUMNS.COUNTRIES.CODE]) > -1,
    );
    return countriesWithRightsScores.length;
  },
);

// aux indicators
// all countries data for latest year any data is available
// could introduce lookback period to include data from previous year if current not available
export const getAuxIndicatorsLatest = createSelector(
  getAuxIndicators,
  getCountries,
  (values, countries) => {
    if (!values || !countries) return null;
    const latestYearsPerAttribute = map(COLUMNS.AUX, column => {
      const attrValues = values.filter(
        val => val[column] && val[column] !== '',
      );
      return {
        col: column,
        year: calcMaxYear(attrValues),
      };
    });
    return countries.map(c =>
      latestYearsPerAttribute.reduce(
        (countryData, attribute) => {
          const value = values.find(
            val =>
              val.country_code === countryData.country_code &&
              val.year === attribute.year,
          );
          // prettier-ignore
          return value
            ? {
              ...countryData,
              [attribute.col]: value[attribute.col],
              [`${attribute.col}-year`]: attribute.year,
            } : countryData;
        },
        { country_code: c.country_code },
      ),
    );
    // console.log(countries)
    // return filterScoresByYear(2016, values);
  },
);
// single country, single year
export const getAuxIndicatorsForCountry = createSelector(
  (state, country) => country,
  getAuxIndicators,
  getMaxYearESR,
  (country, data, year) =>
    data &&
    data.find(d => d.country_code === country && quasiEquals(d.year, year)),
);
export const getLatestCountryCurrentGDP = createSelector(
  (state, country) => country,
  getAuxIndicators,
  (country, data) => {
    if (!data) return false;
    const sorted = data
      .filter(d => d.country_code === country && d[COLUMNS.AUX.GDP_CURRENT_US])
      .sort((a, b) => (parseInt(a.year, 10) > parseInt(b.year, 10) ? -1 : 1));
    if (sorted.length > 0) {
      return {
        value: sorted[0][COLUMNS.AUX.GDP_CURRENT_US],
        year: sorted[0].year,
      };
    }
    return false;
  },
);
export const getLatestCountry2011PPPGDP = createSelector(
  (state, country) => country,
  getAuxIndicators,
  (country, data) => {
    if (!data) return false;
    const sorted = data
      .filter(d => d.country_code === country && d[COLUMNS.AUX.GDP_2011_PPP])
      .sort((a, b) => (parseInt(a.year, 10) > parseInt(b.year, 10) ? -1 : 1));
    if (sorted.length > 0) {
      return {
        value: sorted[0][COLUMNS.AUX.GDP_2011_PPP],
        year: sorted[0].year,
      };
    }
    return false;
  },
);
export const getLatestCountryPopulation = createSelector(
  (state, country) => country,
  getAuxIndicators,
  (country, data) => {
    if (!data) return false;
    const sorted = data
      .filter(d => d.country_code === country && d[COLUMNS.AUX.POPULATION])
      .sort((a, b) => (parseInt(a.year, 10) > parseInt(b.year, 10) ? -1 : 1));
    if (sorted.length > 0) {
      return {
        value: sorted[0][COLUMNS.AUX.POPULATION],
        year: sorted[0].year,
      };
    }
    return false;
  },
);
export const getHowToRead = createSelector(
  getGlobal,
  global => global.howToRead,
);
export const getSettingsLayer = createSelector(
  getGlobal,
  global => global.settings,
);
export const getAsideLayer = createSelector(
  getGlobal,
  global => global.asideLayer,
);
export const getAsideLayerActiveCode = createSelector(
  getAsideLayer,
  asideLayer => asideLayer && asideLayer.code,
);

export const getCookieConsent = createSelector(
  getGlobal,
  global => global.cookieConsent,
);
export const getCookieConsentApp = createSelector(
  getGlobal,
  global => global.cookieConsentApp,
);
export const getCookieConsentChecked = createSelector(
  getGlobal,
  global => global.cookieConsentChecked,
);
export const getGAStatus = createSelector(
  getGlobal,
  global => global.gaInitiliased,
);

export const getDependenciesReady = createSelector(
  (state, dependencies) => dependencies,
  getDataReady,
  (dependencies, data) => dependencies.reduce((m, d) => !!data[d] && m, true),
);

export const getHasCountryESRScores = createSelector(
  (state, countryCode) => countryCode,
  getESRScores,
  getESRYear,
  getStandardSearch,
  (countryCode, scores, year, standardSearch) => {
    const standard = STANDARDS.find(as => as.key === standardSearch);
    const otherStandard = STANDARDS.find(as => as.key !== standardSearch);
    const countryScores =
      scores &&
      scores.filter(
        s => s.country_code === countryCode && quasiEquals(s.year, year),
      );
    return {
      some: countryScores && countryScores.length > 0,
      standard:
        countryScores &&
        countryScores.filter(s => s.standard === standard.code).length > 0,
      otherStandard:
        countryScores &&
        countryScores.filter(s => s.standard === otherStandard.code).length > 0,
    };
  },
);

export const getCountryCodes = createSelector(
  getCountries,
  countries => countries && countries.map(c => c[COLUMNS.COUNTRIES.CODE]),
);
const calculateRegionAverageColumn = (scores, column) =>
  Object.keys(scores).reduce((memo, year) => {
    const yearScores = scores[year];
    const { sum, count } = yearScores.reduce(
      (statsMemo, s) => ({
        sum: statsMemo.sum + parseFloat(s[column]),
        count: statsMemo.count + 1,
      }),
      { sum: 0, count: 0 },
    );
    return {
      ...memo,
      [year]: {
        average: sum / count,
        count,
      },
    };
  }, {});

const calculateRegionAverage = (regionCode, countries, scores, columns) => {
  const regionCountryCodes = countries
    .filter(
      c =>
        regionCode === 'all' || c[COLUMNS.COUNTRIES.UN_REGION] === regionCode,
    )
    .map(c => c[COLUMNS.COUNTRIES.CODE]);
  const scoresByYear = groupBy(
    scores.filter(s => regionCountryCodes.indexOf(s.country_code) > -1),
    s => s.year,
  );
  return columns.reduce(
    (m, col) => ({
      ...m,
      [col.key]: calculateRegionAverageColumn(scoresByYear, col.column),
    }),
    {},
  );
};

export const getESRScoresForUNRegions = createSelector(
  (state, { metricCode }) => metricCode,
  (state, { standard }) => standard,
  getESRScores,
  getCountries,
  getCountryCodes,
  (metricCode, standardKey, scores, countries, countryCodes) => {
    const metric = getMetricDetails(metricCode);
    const standard = STANDARDS.find(s => s.key === standardKey);
    const group = PEOPLE_GROUPS.find(g => g.key === 'all');
    if (metric && group && countries && scores) {
      // prettier-ignore
      const scoresFiltered = scores.filter(s =>
        s[COLUMNS.ESR.GROUP] === group.code &&
        s[COLUMNS.ESR.STANDARD] === standard.code &&
        s[COLUMNS.ESR.METRIC] === metric.code &&
        countryCodes.indexOf(s.country_code) > -1,
      );
      const regionScores = UN_REGIONS.values.reduce(
        (m, regionCode) => ({
          ...m,
          [regionCode]: calculateRegionAverage(
            regionCode,
            countries,
            scoresFiltered,
            BENCHMARKS,
          ),
        }),
        {},
      );
      const globalScores = calculateRegionAverage(
        'all',
        countries,
        scoresFiltered,
        BENCHMARKS,
      );
      // console.log(regionScores)
      return {
        all: globalScores,
        ...regionScores,
      };
    }
    return null;
  },
);
export const getCPRScoresForUNRegions = createSelector(
  (state, { metricCode }) => metricCode,
  getCPRScores,
  getCountries,
  getCountryCodes,
  (metricCode, scores, countries, countryCodes) => {
    const metric = getMetricDetails(metricCode);
    if (metric && countries && scores) {
      // prettier-ignore
      const scoresFiltered = scores.filter(s =>
        s[COLUMNS.CPR.METRIC] === metric.code &&
        countryCodes.indexOf(s.country_code) > -1,
      );
      const columns = [{ key: 'mean', column: COLUMNS.CPR.MEAN }];
      const regionScores = UN_REGIONS.values.reduce(
        (m, regionCode) => ({
          ...m,
          [regionCode]: calculateRegionAverage(
            regionCode,
            countries,
            scoresFiltered,
            columns,
          ),
        }),
        {},
      );
      const globalScores = calculateRegionAverage(
        'all',
        countries,
        scoresFiltered,
        columns,
      );
      // console.log(regionScores)
      return {
        all: globalScores,
        ...regionScores,
      };
    }
    return null;
  },
);
