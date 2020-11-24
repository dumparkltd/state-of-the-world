import messages from 'messages';
import { RIGHTS, COUNTRY_SORTS, COLUMNS } from 'containers/App/constants';
import quasiEquals from 'utils/quasi-equals';
import isNumber from 'utils/is-number';

export const getRightsScoresForType = (rights, typeKey) =>
  rights &&
  Object.values(rights)
    .filter(r => r.type === typeKey && typeof r.aggregate === 'undefined')
    .sort((a, b) =>
      RIGHTS.map(r => r.key).indexOf(a.key) >
      RIGHTS.map(r => r.key).indexOf(b.key)
        ? 1
        : -1,
    );

const isDataIncomplete = data => data.hasScoreRights || data.hasScoreIndicators;

const hasDataAlternate = data =>
  data.hasScoreAlternate ||
  data.hasScoreRightsAlternate ||
  data.hasScoreIndicatorsAlternate;

export const getNoDataMessage = (data = false) => {
  if (!data) return null;
  if (isDataIncomplete(data)) {
    return 'incompleteData';
  }
  if (hasDataAlternate(data)) {
    return 'noDataForStandard';
  }
  return 'noData';
};

export const getIncompleteDataActionMessage = data => {
  if (!data) return null;
  if (data.hasScoreAlternate) {
    return 'changeStandard';
  }
  if (data.hasScoreAlternateRights) {
    return 'changeStandard';
  }
  if (data.hasScoreIndicatorsAlternate) {
    return 'changeStandard';
  }
  return '';
};

export const getScoresForCountry = (countryCode, scores) => ({
  esr: scores.esr && scores.esr[countryCode],
  cpr: scores.cpr && scores.cpr[countryCode],
});

export const sortCountriesByName = (a, b, order = 'asc', intl) => {
  const factor = order === 'asc' ? 1 : -1;
  const nameA = messages.countries[a[COLUMNS.COUNTRIES.CODE]]
    ? intl.formatMessage(messages.countries[a[COLUMNS.COUNTRIES.CODE]])
    : a[COLUMNS.COUNTRIES.CODE];
  const nameB = messages.countries[b[COLUMNS.COUNTRIES.CODE]]
    ? intl.formatMessage(messages.countries[b[COLUMNS.COUNTRIES.CODE]])
    : a[COLUMNS.COUNTRIES.CODE];
  return nameA > nameB ? factor * 1 : factor * -1;
};
const sortByNumber = (a, b, order) => {
  const factor = order === 'asc' ? 1 : -1;
  if (!isNumber(a) && !isNumber(b)) {
    return 0;
  }
  if (isNumber(a) && !isNumber(b)) {
    return -1;
  }
  if (!isNumber(a) && isNumber(b)) {
    return 1;
  }
  // prettier-ignore
  return parseFloat(a, 10) > parseFloat(b, 10)
    ? factor * 1
    : factor * -1;
};

const findLatestValue = (countryAuxIndicators, column) => {
  const sorted = countryAuxIndicators
    .filter(i => i[column] !== '' && i[column] !== null)
    .sort((a, b) => (parseInt(a.year, 10) > parseInt(b.year, 10) ? -1 : 1));
  return sorted.length > 0 && sorted[0][column];
};

const mapAttribute = (s, auxIndicators, column) => {
  const countryAuxIndicators = auxIndicators.filter(i =>
    quasiEquals(s[COLUMNS.COUNTRIES.CODE], i[COLUMNS.COUNTRIES.CODE]),
  );
  const aux = findLatestValue(countryAuxIndicators, column);
  return {
    [column]: aux || null,
    ...s,
  };
};

export const sortScores = ({
  sort,
  order,
  intl,
  scores,
  column,
  auxIndicators,
}) => {
  const sortOption = COUNTRY_SORTS[sort];
  // const factor = order === 'asc' ? -1 : 1;
  if (!scores) {
    return {
      sorted: false,
    };
  }
  if (sort === 'name') {
    return {
      sorted: scores.sort((a, b) => sortCountriesByName(a, b, order, intl)),
    };
  }
  if (sortOption.data === 'aux' && auxIndicators) {
    const mappedScores = scores.map(c =>
      mapAttribute(c, auxIndicators, sortOption.column),
    );
    return {
      sorted: mappedScores
        .filter(s => s[sortOption.column] && s[sortOption.column] !== '')
        .sort((a, b) => sortCountriesByName(a, b, order, intl))
        .sort((a, b) =>
          sortByNumber(a[sortOption.column], b[sortOption.column], order),
        ),
      other: mappedScores
        .filter(s => !s[sortOption.column] || s[sortOption.column] === '')
        .sort((a, b) => sortCountriesByName(a, b, 'asc', intl)),
    };
  }
  // sort by score
  return {
    sorted: scores
      .sort((a, b) => sortCountriesByName(a, b, order, intl))
      .sort((a, b) => sortByNumber(a[column], b[column], order)),
  };
};
export const roundScore = (value, digits = 1) => {
  const factor = 10 ** Math.min(digits, 3);
  return isNumber(value) && Math.round(value * factor) / factor;
};
export const formatScore = (value, digits = 1, intl) => {
  const d = Math.min(digits, 3);
  if (isNumber(value)) {
    const rounded = roundScore(value, d);
    return intl
      ? intl.formatNumber(rounded, { minimumFractionDigits: d })
      : rounded.toFixed(d);
  }
  return value;
};
export const formatScoreMax = (
  value,
  maxValue = 100,
  digits = 1,
  showMax,
  intl,
) => {
  const formatted = formatScore(value, digits, intl);
  if (formatted && maxValue === 100) {
    return `${formatted}%`;
  }
  if (formatted && !showMax) {
    return formatted;
  }
  return formatted && `${formatted}/${maxValue}`;
};
