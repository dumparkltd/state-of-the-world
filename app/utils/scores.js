import { RIGHTS, TYPES } from 'containers/App/constants';
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

export const sortCountriesByName = (nameA, nameB, order = 'asc') => {
  const factor = order === 'asc' ? 1 : -1;
  return nameA > nameB ? factor * 1 : factor * -1;
};
export const sortByNumber = (a, b, order = 'desc') => {
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

export const sortScores = ({ sort, order, data }) => {
  if (!data) {
    return false;
  }
  if (sort === 'name') {
    return data.sort((a, b) => sortCountriesByName(a.name, b.name, order));
  }
  // sort by score
  return data
    .sort((a, b) => sortCountriesByName(a.name, b.name, order))
    .sort((a, b) => sortByNumber(a.value, b.value, order));
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
export const formatScoreMax = (value, type, showMax, intl) => {
  const maxValue = getMaxScore(type);
  const digits = getDigitsScore(type);
  const formatted = formatScore(value, digits, intl);
  if (formatted && maxValue === 100) {
    return `${formatted}%`;
  }
  if (formatted && !showMax) {
    return formatted;
  }
  return formatted && `${formatted}/${maxValue}`;
};

export const getRightType = key => TYPES.find(t => t.key === key);

export const getMaxScore = key => {
  const type = getRightType(key);
  return type.max;
};
export const getMaxXScore = key => {
  const type = getRightType(key);
  return type.maxX || type.max;
};
export const getMinXScore = key => {
  const type = getRightType(key);
  return type.minX || type.min;
};
export const getDigitsScore = key => {
  const type = getRightType(key);
  return type.digits;
};
