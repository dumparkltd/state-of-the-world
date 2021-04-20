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
import { sortByNumber } from 'utils/scores';

import { initialState } from './reducer';
import {
  STANDARDS,
  BENCHMARKS,
  UN_REGIONS,
  COUNTRY_SORTS,
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
export const getNotes = createSelector(
  getGlobal,
  global => global.notes,
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
export const getVDEMScores = createSelector(
  getData,
  data => data.vdemScores,
);
export const getAuxIndicators = createSelector(
  getData,
  data => data.auxIndicators,
);
export const getESRIndicators = createSelector(
  getData,
  data => data.esrIndicators,
);
export const getCountries = createSelector(
  getData,
  data => data.countries,
);
export const getHRCTerms = createSelector(
  getData,
  data => data.hrcTerms,
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
export const getYearVDEMSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('yvdem') && isInteger(search.get('yvdem'))
      ? search.get('yvdem')
      : false,
);

export const getUNRegionSearch = createSelector(
  getRouterSearchParams,
  search =>
    search.has('unregion') &&
    UN_REGIONS.options.map(o => o.key).indexOf(search.get('unregion')) > -1
      ? search.get('unregion')
      : 'world',
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
export const getMaxYearVDEM = createSelector(
  getVDEMScores,
  scores => calcMaxYear(scores),
);
export const getMinYearVDEM = createSelector(
  getVDEMScores,
  scores => calcMinYear(scores),
);
export const getESRYearRange = createSelector(
  getMinYearESR,
  getMaxYearESR,
  (min, max) => ({ min, max }),
);
export const getCPRYearRange = createSelector(
  getMinYearCPR,
  getMaxYearCPR,
  (min, max) => ({ min, max }),
);
export const getVDEMYearRange = createSelector(
  getMinYearVDEM,
  getMaxYearVDEM,
  (min, max) => ({ min, max }),
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
export const getVDEMYear = createSelector(
  getYearVDEMSearch,
  getMaxYearVDEM,
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
  (countries, unregion) =>
    countries &&
    (!unregion || unregion === 'world' || unregion === 'all'
      ? countries
      : countries.filter(c => unregion === c[COLUMNS.COUNTRIES.UN_REGION])),
);
const addRank = (memo, s, index) => {
  if (memo.length === 0) {
    return [
      {
        ...s,
        rank: 1,
      },
    ];
  }
  const previous = memo[memo.length - 1];
  const rank = s.value === previous.value ? previous.rank : index + 1;
  return [
    ...memo,
    {
      ...s,
      rank,
    },
  ];
};
// single right, multiple countries, all years
export const getESRRightScores = createSelector(
  (state, metric) => metric,
  getESRScores,
  getCountriesFiltered,
  getStandardSearch,
  getBenchmarkSearch,
  getESRYear,
  (metric, scores, countries, standardSearch, benchmarkSearch, year) => {
    // make sure we have a valid metric
    const right = !!metric && RIGHTS.find(d => d.key === metric);
    if (!scores || !countries || !right) return false;

    const standard = STANDARDS.find(as => as.key === standardSearch);
    const benchmark = BENCHMARKS.find(b => b.key === benchmarkSearch);
    const group = PEOPLE_GROUPS[0];
    // make sure we have a valid country
    const countryCodes = countries ? countries.map(c => c.country_code) : [];
    const metricScores = scores
      .filter(
        s =>
          s.group === group.code &&
          s.standard === standard.code &&
          s.metric_code === right.code &&
          countryCodes.indexOf(s.country_code) > -1,
      )
      .map(s => ({ ...s, value: parseFloat(s[benchmark.column], 10) }));
    const prevScores = metricScores
      .filter(s => quasiEquals(s.year, year - 1))
      .sort((a, b) => sortByNumber(a.value, b.value));
    return metricScores
      .filter(s => quasiEquals(s.year, year))
      .sort((a, b) => sortByNumber(a.value, b.value))
      .reduce(addRank, [])
      .map(s => {
        const prevScore = prevScores.find(
          ps => s.country_code === ps.country_code,
        );
        return {
          ...s,
          prevValue: prevScore && prevScore.value,
        };
      });
  },
);

// single right, multiple countries, all years
export const getCPRRightScores = createSelector(
  (state, metric) => metric,
  getCPRScores,
  getCountriesFiltered,
  getCPRYear,
  (metric, scores, countries, year) => {
    // make sure we have a valid metric
    const right = !!metric && RIGHTS.find(d => d.key === metric);
    if (!scores || !countries || !right) return false;

    const countryCodes = countries ? countries.map(c => c.country_code) : [];
    const metricScores = scores
      .filter(
        s =>
          s.metric_code === right.code &&
          countryCodes.indexOf(s.country_code) > -1,
      )
      .map(s => ({ ...s, value: parseFloat(s[COLUMNS.CPR.MEAN], 10) }));

    const prevScores = metricScores
      .filter(s => quasiEquals(s.year, year - 1))
      .sort((a, b) => sortByNumber(a.value, b.value));
    return metricScores
      .filter(s => quasiEquals(s.year, year))
      .sort((a, b) => sortByNumber(a.value, b.value))
      .reduce(addRank, [])
      .map(s => {
        const prevScore = prevScores.find(
          ps => s.country_code === ps.country_code,
        );
        return {
          ...s,
          prevValue: prevScore && prevScore.value,
        };
      });
  },
);
export const getVDEMRightScores = createSelector(
  (state, metric) => metric,
  getVDEMScores,
  getCountriesFiltered,
  getVDEMYear,
  (metric, scores, countries, year) => {
    // make sure we have a valid metric
    const right = !!metric && RIGHTS.find(d => d.key === metric);
    if (!scores || !countries || !right) return false;

    const countryCodes = countries ? countries.map(c => c.country_code) : [];
    const metricScores = scores
      .filter(
        s =>
          s.metric_code === right.code &&
          countryCodes.indexOf(s.country_code) > -1,
      )
      .map(s => ({ ...s, value: parseFloat(s[COLUMNS.VDEM.MEAN], 10) }));

    const prevScores = metricScores
      .filter(s => quasiEquals(s.year, year - 1))
      .sort((a, b) => sortByNumber(a.value, b.value));
    return metricScores
      .filter(s => quasiEquals(s.year, year))
      .sort((a, b) => sortByNumber(a.value, b.value))
      .reduce(addRank, [])
      .map(s => {
        const prevScore = prevScores.find(
          ps => s.country_code === ps.country_code,
        );
        return {
          ...s,
          prevValue: prevScore && prevScore.value,
        };
      });
  },
);

// single country, all rights, single year
export const getRightScoresForCountry = createSelector(
  (state, country) => country,
  getESRScores,
  getCPRScores,
  getVDEMScores,
  getESRYear,
  getCPRYear,
  getVDEMYear,
  (country, esrScores, cprScores, vdemScores, esrYear, cprYear, vdemYear) => {
    const rightsESR = RIGHTS.filter(d => d.type === 'esr').map(d => d.code);
    const rightsCPR = RIGHTS.filter(d => d.type === 'cpr').map(d => d.code);
    const rightsVDEM = RIGHTS.filter(d => d.type === 'vdem').map(d => d.code);
    return (
      country &&
      esrScores &&
      cprScores &&
      vdemScores && {
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
        vdem: vdemScores.filter(
          s =>
            s.country_code === country &&
            quasiEquals(s.year, vdemYear) &&
            rightsVDEM.indexOf(s.metric_code) > -1,
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
        if (r.type === 'vdem') {
          return {
            [r.key]: {
              score: scores.vdem.find(s => s.metric_code === r.code),
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
export const getVDEMScoresForYear = createSelector(
  getVDEMYear,
  getVDEMScores,
  (year, scores) => filterScoresByYear(year, scores),
);

// All countries
const scoresByCountry = scores =>
  !!scores &&
  scores.reduce((memo, score) => {
    const metric = RIGHTS.find(r => r.code === score.metric_code);
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
export const getVDEMScoresByCountry = createSelector(
  getVDEMScoresForYear,
  scores => scoresByCountry(scores, 'vdem'),
);

export const getScoresByCountry = createSelector(
  getESRScoresByCountry,
  getCPRScoresByCountry,
  getVDEMScoresByCountry,
  (esr, cpr, vdem) => ({
    esr,
    cpr,
    vdem,
  }),
);

export const getNumberCountriesWithScores = createSelector(
  getCountries,
  getESRScoresByCountry,
  getCPRScoresByCountry,
  getVDEMScoresByCountry,
  (countries, esr, cpr, vdem) => {
    if (!countries || !esr || !cpr || !vdem) return 0;
    const countriesWithRightsScores = countries.filter(
      c =>
        Object.keys(cpr).indexOf(c[COLUMNS.COUNTRIES.CODE]) > -1 ||
        Object.keys(esr).indexOf(c[COLUMNS.COUNTRIES.CODE]) > -1 ||
        Object.keys(vdem).indexOf(c[COLUMNS.COUNTRIES.CODE]) > -1,
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

export const getUNRegionTotals = createSelector(
  getCountries,
  countries => {
    if (!countries) return null;
    const regions = UN_REGIONS.options;
    return regions
      .filter(({ key }) => key !== 'world')
      .reduce(
        (memo, { key }) => {
          const regionCountries = countries.filter(
            c => c[COLUMNS.COUNTRIES.UN_REGION] === key,
          );
          return {
            ...memo,
            [key]: regionCountries.length,
          };
        },
        {
          world: countries.length,
        },
      );
  },
);

export const getCountryCodesFiltered = createSelector(
  getCountriesFiltered,
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
const calculateRegionSDColumn = (scores, column) =>
  Object.keys(scores).reduce((memo, year) => {
    const yearScores = scores[year];
    const { sum, count } = yearScores.reduce(
      (statsMemo, s) => ({
        sum: statsMemo.sum + parseFloat(s[column]) ** 2,
        count: statsMemo.count + 1,
      }),
      { sum: 0, count: 0 },
    );
    return {
      ...memo,
      [year]: {
        average: (sum / count) ** 0.5,
        count,
      },
    };
  }, {});

const calculateRegionAverage = (regionCode, countries, scores, columns) => {
  const regionCountryCodes = countries
    .filter(
      c =>
        regionCode === 'world' || c[COLUMNS.COUNTRIES.UN_REGION] === regionCode,
    )
    .map(c => c[COLUMNS.COUNTRIES.CODE]);
  const scoresByYear = groupBy(
    scores.filter(s => regionCountryCodes.indexOf(s.country_code) > -1),
    s => s.year,
  );
  return columns.reduce((m, col) => {
    const avg =
      col.method === 'sd'
        ? calculateRegionSDColumn(scoresByYear, col.column)
        : calculateRegionAverageColumn(scoresByYear, col.column);
    return {
      ...m,
      [col.key]: avg,
    };
  }, {});
};
const getCountryScores = (countryCode, scores, columns) => {
  const scoresByYear = groupBy(
    scores.filter(s => s.country_code === countryCode),
    s => s.year,
  );
  return columns.reduce(
    (m, col) => ({
      ...m,
      [col.key]: Object.keys(scoresByYear).reduce((mm, year) => {
        const yearScore = scoresByYear[year][0];
        return {
          ...mm,
          [year]: {
            score: yearScore[col.column],
          },
        };
      }, {}),
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
  getStandardSearch,
  (
    metricCode,
    standardKey,
    scores,
    countries,
    countryCodes,
    standardSearch,
  ) => {
    const metric = getMetricDetails(metricCode);
    const standard = STANDARDS.find(
      s => s.key === (standardKey || standardSearch),
    );
    const regions = UN_REGIONS.options;
    const group = PEOPLE_GROUPS.find(g => g.key === 'all');
    if (metric && group && countries && scores) {
      // prettier-ignore
      const countryScores = scores.filter(s =>
        s[COLUMNS.ESR.GROUP] === group.code &&
        s[COLUMNS.ESR.STANDARD] === standard.code &&
        s[COLUMNS.ESR.METRIC] === metric.code &&
        countryCodes.indexOf(s.country_code) > -1,
      );
      const regionScores = regions.reduce(
        (m, region) => ({
          ...m,
          [region.key]: calculateRegionAverage(
            region.key,
            countries,
            countryScores,
            BENCHMARKS,
          ),
        }),
        {},
      );
      // console.log(regionScores)
      return {
        regions: regionScores,
        countries: false,
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
    const regions = UN_REGIONS.options;
    if (metric && countries && scores) {
      // prettier-ignore
      const countryScores = scores.filter(s =>
        s[COLUMNS.CPR.METRIC] === metric.code &&
        countryCodes.indexOf(s.country_code) > -1,
      );
      const columns = [
        { key: COLUMNS.CPR.MEAN, column: COLUMNS.CPR.MEAN, method: 'mean' },
        { key: COLUMNS.CPR.SD, column: COLUMNS.CPR.SD, method: 'sd' },
      ];
      const regionScores = regions.reduce(
        (m, region) => ({
          ...m,
          [region.key]: calculateRegionAverage(
            region.key,
            countries,
            countryScores,
            columns,
          ),
        }),
        {},
      );
      return {
        regions: regionScores,
        countries: false,
      };
    }
    return null;
  },
);
export const getVDEMScoresForUNRegions = createSelector(
  (state, { metricCode }) => metricCode,
  getVDEMScores,
  getCountries,
  getCountryCodes,
  (metricCode, scores, countries, countryCodes) => {
    const metric = getMetricDetails(metricCode);
    const regions = UN_REGIONS.options;
    if (metric && countries && scores) {
      // prettier-ignore
      const countryScores = scores.filter(s =>
        s[COLUMNS.VDEM.METRIC] === metric.code &&
        countryCodes.indexOf(s.country_code) > -1,
      );
      const columns = [
        { key: COLUMNS.VDEM.MEAN, column: COLUMNS.VDEM.MEAN, method: 'mean' },
        { key: COLUMNS.VDEM.SD, column: COLUMNS.VDEM.SD, method: 'sd' },
      ];
      const regionScores = regions.reduce(
        (m, region) => ({
          ...m,
          [region.key]: calculateRegionAverage(
            region.key,
            countries,
            countryScores,
            columns,
          ),
        }),
        {},
      );
      return {
        regions: regionScores,
        countries: false,
      };
    }
    return null;
  },
);

export const getESRScoresForUNRegionsCountries = createSelector(
  (state, { metricCode }) => metricCode,
  (state, { standard }) => standard,
  getESRScores,
  getCountriesFiltered,
  getCountryCodesFiltered,
  getStandardSearch,
  getUNRegionSearch,
  (
    metricCode,
    standardKey,
    scores,
    countries,
    countryCodes,
    standardSearch,
    unregionSearch,
  ) => {
    const metric = getMetricDetails(metricCode);
    const standard = STANDARDS.find(
      s => s.key === (standardKey || standardSearch),
    );
    const regions = UN_REGIONS.options
      .filter(r => r.key !== 'all')
      .filter(
        r =>
          !unregionSearch ||
          (unregionSearch === 'all' || r.key === unregionSearch),
      );
    const group = PEOPLE_GROUPS.find(g => g.key === 'all');
    if (metric && group && countries && scores) {
      // prettier-ignore
      const countryScores = scores.filter(s =>
        s[COLUMNS.ESR.GROUP] === group.code &&
        s[COLUMNS.ESR.STANDARD] === standard.code &&
        s[COLUMNS.ESR.METRIC] === metric.code &&
        countryCodes.indexOf(s.country_code) > -1,
      );
      const regionScores = regions.reduce(
        (m, region) => ({
          ...m,
          [region.key]: calculateRegionAverage(
            region.key,
            countries,
            countryScores,
            BENCHMARKS,
          ),
        }),
        {},
      );
      return {
        regions: regionScores,
        countries:
          unregionSearch &&
          unregionSearch !== 'all' &&
          countryCodes.reduce(
            (m, countryCode) => ({
              ...m,
              [countryCode]: getCountryScores(
                countryCode,
                countryScores,
                BENCHMARKS,
              ),
            }),
            {},
          ),
      };
    }
    return null;
  },
);
export const getCPRScoresForUNRegionsCountries = createSelector(
  (state, { metricCode }) => metricCode,
  getCPRScores,
  getCountriesFiltered,
  getCountryCodesFiltered,
  getUNRegionSearch,
  (metricCode, scores, countries, countryCodes, unregionSearch) => {
    const metric = getMetricDetails(metricCode);
    const regions = UN_REGIONS.options
      .filter(r => r.key !== 'all')
      .filter(
        r =>
          !unregionSearch ||
          (unregionSearch === 'all' || r.key === unregionSearch),
      );
    if (metric && countries && scores) {
      // prettier-ignore
      const countryScores = scores.filter(s =>
        s[COLUMNS.CPR.METRIC] === metric.code &&
        countryCodes.indexOf(s.country_code) > -1,
      );
      const regionColumns = [
        { key: COLUMNS.CPR.MEAN, column: COLUMNS.CPR.MEAN, method: 'mean' },
        { key: COLUMNS.CPR.SD, column: COLUMNS.CPR.SD, method: 'sd' },
      ];
      const regionScores = regions.reduce(
        (m, region) => ({
          ...m,
          [region.key]: calculateRegionAverage(
            region.key,
            countries,
            countryScores,
            regionColumns,
          ),
        }),
        {},
      );
      // console.log(regionScores)
      const countryColumns = [
        { key: COLUMNS.CPR.MEAN, column: COLUMNS.CPR.MEAN },
        { key: COLUMNS.CPR.LO, column: COLUMNS.CPR.LO },
        { key: COLUMNS.CPR.HI, column: COLUMNS.CPR.HI },
      ];
      return {
        regions: regionScores,
        countries:
          unregionSearch &&
          unregionSearch !== 'all' &&
          countryCodes.reduce(
            (m, countryCode) => ({
              ...m,
              [countryCode]: getCountryScores(
                countryCode,
                countryScores,
                countryColumns,
              ),
            }),
            {},
          ),
      };
    }
    return null;
  },
);
export const getVDEMScoresForUNRegionsCountries = createSelector(
  (state, { metricCode }) => metricCode,
  getVDEMScores,
  getCountriesFiltered,
  getCountryCodesFiltered,
  getUNRegionSearch,
  (metricCode, scores, countries, countryCodes, unregionSearch) => {
    const metric = getMetricDetails(metricCode);
    const regions = UN_REGIONS.options
      .filter(r => r.key !== 'all')
      .filter(
        r =>
          !unregionSearch ||
          (unregionSearch === 'all' || r.key === unregionSearch),
      );
    if (metric && countries && scores) {
      // prettier-ignore
      const countryScores = scores.filter(s =>
        s[COLUMNS.VDEM.METRIC] === metric.code &&
        countryCodes.indexOf(s.country_code) > -1,
      );
      const regionColumns = [
        { key: COLUMNS.VDEM.MEAN, column: COLUMNS.VDEM.MEAN, method: 'mean' },
        { key: COLUMNS.VDEM.SD, column: COLUMNS.VDEM.SD, method: 'sd' },
      ];
      const regionScores = regions.reduce(
        (m, region) => ({
          ...m,
          [region.key]: calculateRegionAverage(
            region.key,
            countries,
            countryScores,
            regionColumns,
          ),
        }),
        {},
      );
      // console.log(regionScores)
      const countryColumns = [
        { key: COLUMNS.VDEM.MEAN, column: COLUMNS.VDEM.MEAN },
        { key: COLUMNS.VDEM.LO, column: COLUMNS.VDEM.LO },
        { key: COLUMNS.VDEM.HI, column: COLUMNS.VDEM.HI },
      ];
      return {
        regions: regionScores,
        countries:
          unregionSearch &&
          unregionSearch !== 'all' &&
          countryCodes.reduce(
            (m, countryCode) => ({
              ...m,
              [countryCode]: getCountryScores(
                countryCode,
                countryScores,
                countryColumns,
              ),
            }),
            {},
          ),
      };
    }
    return null;
  },
);

// const region = UN_REGIONS.options.filter(
//   r => r.key === country[COLUMNS.COUNTRIES.UN_REGION],
// );
export const getESRScoresForCountry = createSelector(
  (state, { countryCode }) => countryCode,
  (state, { metricCode }) => metricCode,
  getESRScores,
  getStandardSearch,
  (countryCode, metricCode, scores, standardSearch) => {
    const metric = getMetricDetails(metricCode);
    const standard = STANDARDS.find(as => as.key === standardSearch);
    const group = PEOPLE_GROUPS.find(g => g.key === 'all');
    if (metric && group && scores) {
      const countryScores = scores.filter(
        s =>
          s[COLUMNS.ESR.GROUP] === group.code &&
          s[COLUMNS.ESR.STANDARD] === standard.code &&
          s[COLUMNS.ESR.METRIC] === metric.code &&
          s.country_code === countryCode,
      );
      return getCountryScores(countryCode, countryScores, BENCHMARKS);
    }
    return null;
  },
);
export const getHasOtherESRScoresForCountry = createSelector(
  (state, { countryCode }) => countryCode,
  (state, { metricCode }) => metricCode,
  getESRScores,
  getStandardSearch,
  (countryCode, metricCode, scores, standardSearch) => {
    const metric = getMetricDetails(metricCode);
    const otherStandard = STANDARDS.find(as => as.key !== standardSearch);
    const group = PEOPLE_GROUPS.find(g => g.key === 'all');
    if (metric && group && scores) {
      const hasCountryScores = scores.some(
        s =>
          s[COLUMNS.ESR.GROUP] === group.code &&
          s[COLUMNS.ESR.STANDARD] === otherStandard.code &&
          s[COLUMNS.ESR.METRIC] === metric.code &&
          s.country_code === countryCode,
      );
      return hasCountryScores;
    }
    return null;
  },
);

export const getCPRScoresForCountry = createSelector(
  (state, { countryCode }) => countryCode,
  (state, { metricCode }) => metricCode,
  getCPRScores,
  (countryCode, metricCode, scores) => {
    const metric = getMetricDetails(metricCode);
    if (metric && scores) {
      const countryScores = scores.filter(
        s =>
          s[COLUMNS.CPR.METRIC] === metric.code &&
          s.country_code === countryCode,
      );
      const columns = [
        { key: COLUMNS.CPR.MEAN, column: COLUMNS.CPR.MEAN },
        { key: COLUMNS.CPR.LO, column: COLUMNS.CPR.LO },
        { key: COLUMNS.CPR.HI, column: COLUMNS.CPR.HI },
      ];
      return getCountryScores(countryCode, countryScores, columns);
    }
    return null;
  },
);
export const getVDEMScoresForCountry = createSelector(
  (state, { countryCode }) => countryCode,
  (state, { metricCode }) => metricCode,
  getCPRScores,
  (countryCode, metricCode, scores) => {
    const metric = getMetricDetails(metricCode);
    if (metric && scores) {
      const countryScores = scores.filter(
        s =>
          s[COLUMNS.VDEM.METRIC] === metric.code &&
          s.country_code === countryCode,
      );
      const columns = [
        { key: COLUMNS.VDEM.MEAN, column: COLUMNS.VDEM.MEAN },
        { key: COLUMNS.VDEMVDEM.LO, column: COLUMNS.VDEM.LO },
        { key: COLUMNS.VDEM.HI, column: COLUMNS.VDEM.HI },
      ];
      return getCountryScores(countryCode, countryScores, columns);
    }
    return null;
  },
);
export const getESRScoresForCountryUNRegion = createSelector(
  (state, { metricCode }) => metricCode,
  (state, { countryCode }) => countryCode,
  getCountries,
  getCountryCodes,
  getESRScores,
  getStandardSearch,
  (
    metricCode,
    countryCode,
    countries,
    countryCodes,
    scores,
    standardSearch,
  ) => {
    const metric = getMetricDetails(metricCode);
    const standard = STANDARDS.find(s => s.key === standardSearch);
    const group = PEOPLE_GROUPS.find(g => g.key === 'all');
    const country =
      countries && countries.find(c => c.country_code === countryCode);
    if (metric && group && country && countries && scores) {
      const region = UN_REGIONS.options.find(
        r => r.key === country[COLUMNS.COUNTRIES.UN_REGION],
      );
      if (!region) return null;
      const countryScores = scores.filter(
        s =>
          s[COLUMNS.ESR.GROUP] === group.code &&
          s[COLUMNS.ESR.STANDARD] === standard.code &&
          s[COLUMNS.ESR.METRIC] === metric.code &&
          countryCodes.indexOf(s.country_code) > -1,
      );
      return {
        [region.key]: calculateRegionAverage(
          region.key,
          countries,
          countryScores,
          BENCHMARKS,
        ),
      };
    }
    return null;
  },
);
export const getCPRScoresForCountryUNRegion = createSelector(
  (state, { metricCode }) => metricCode,
  (state, { countryCode }) => countryCode,
  getCountries,
  getCountryCodes,
  getCPRScores,
  (metricCode, countryCode, countries, countryCodes, scores) => {
    const metric = getMetricDetails(metricCode);
    const country =
      countries && countries.find(c => c.country_code === countryCode);
    if (metric && scores && country) {
      const region = UN_REGIONS.options.find(
        r => r.key === country[COLUMNS.COUNTRIES.UN_REGION],
      );
      if (!region) return null;
      const countryScores = scores.filter(
        s =>
          s[COLUMNS.CPR.METRIC] === metric.code &&
          countryCodes.indexOf(s.country_code) > -1,
      );
      const columns = [{ key: 'mean', column: COLUMNS.CPR.MEAN }];
      return {
        [region.key]: calculateRegionAverage(
          region.key,
          countries,
          countryScores,
          columns,
        ),
      };
    }
    return null;
  },
);
export const getVDEMScoresForCountryUNRegion = createSelector(
  (state, { metricCode }) => metricCode,
  (state, { countryCode }) => countryCode,
  getCountries,
  getCountryCodes,
  getVDEMScores,
  (metricCode, countryCode, countries, countryCodes, scores) => {
    const metric = getMetricDetails(metricCode);
    const country =
      countries && countries.find(c => c.country_code === countryCode);
    if (metric && scores && country) {
      const region = UN_REGIONS.options.find(
        r => r.key === country[COLUMNS.COUNTRIES.UN_REGION],
      );
      if (!region) return null;
      const countryScores = scores.filter(
        s =>
          s[COLUMNS.VDEM.METRIC] === metric.code &&
          countryCodes.indexOf(s.country_code) > -1,
      );
      const columns = [{ key: 'mean', column: COLUMNS.VDEM.MEAN }];
      return {
        [region.key]: calculateRegionAverage(
          region.key,
          countries,
          countryScores,
          columns,
        ),
      };
    }
    return null;
  },
);
