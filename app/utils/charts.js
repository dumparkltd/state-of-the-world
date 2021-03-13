import { isMaxSize } from 'utils/responsive';
import { formatScoreMax } from 'utils/scores';
import { CRITICAL_VALUE } from 'containers/App/constants';

export const getXTime = year => new Date(`${year}`).getTime();

export const getTickValuesX = (size, mode, minYear, maxYear) => {
  if (mode === 'multi' || mode === 'multi-country' || isMaxSize(size, 'sm')) {
    return [getXTime(minYear), getXTime(maxYear)];
  }
  const tickValuesX = [];
  /* eslint-disable no-plusplus */
  for (let y = minYear; y <= maxYear; y++) {
    tickValuesX.push(getXTime(y));
  }
  /* eslint-enable no-plusplus */
  return tickValuesX;
};

export const getTickValuesY = (type, mode) => {
  if (mode === 'detail') {
    return type === 'esr' ? [0, 20, 40, 60, 80, 100] : [0, 2, 4, 6, 8, 10];
  }
  return type === 'esr' ? [0, 50, 100] : [0, 5, 10];
};

// prettier-ignore
export const getRegionYearData = (year, regionColumnScores) =>
  regionColumnScores[year]
    ? [({
      syear: year,
      x: getXTime(year),
      y: parseFloat(regionColumnScores[year].average),
      count: parseFloat(regionColumnScores[year].count),
    })]
    : [];
// prettier-ignore
export const getRegionYearDataHigh = (
  year,
  regionColumnScoresSD,
  regionColumnScoresMean,
  interval,
) => {
  if (regionColumnScoresSD[year] && regionColumnScoresMean[year]) {
    const sd = parseFloat(regionColumnScoresSD[year].average)
    const mean = parseFloat(regionColumnScoresMean[year].average)
    const value = mean + sd * CRITICAL_VALUE[interval];
    return [({
      syear: year,
      x: getXTime(year),
      y: value,
      count: parseFloat(regionColumnScoresSD[year].count),
    })];
  }
  return [];
}
// prettier-ignore
export const getRegionYearDataLow = (
  year,
  regionColumnScoresSD,
  regionColumnScoresMean,
  interval,
) => {
  if (regionColumnScoresSD[year] && regionColumnScoresMean[year]) {
    const sd = parseFloat(regionColumnScoresSD[year].average)
    const mean = parseFloat(regionColumnScoresMean[year].average)
    const value = mean - sd * CRITICAL_VALUE[interval];
    return [({
      syear: year,
      x: getXTime(year),
      y: value,
      count: parseFloat(regionColumnScoresSD[year].count),
    })];
  }
  return [];
}

export const getRegionData = regionColumnScores =>
  Object.keys(regionColumnScores).reduce(
    (memo, year) => [...memo, ...getRegionYearData(year, regionColumnScores)],
    [],
  );
export const getRegionDataHigh = (
  regionColumnScoresSD,
  regionColumnScoresMean,
  interval,
) =>
  Object.keys(regionColumnScoresSD).reduce(
    (memo, year) => [
      ...memo,
      ...getRegionYearDataHigh(
        year,
        regionColumnScoresSD,
        regionColumnScoresMean,
        interval,
      ),
    ],
    [],
  );
export const getRegionDataLow = (
  regionColumnScoresSD,
  regionColumnScoresMean,
  interval,
) =>
  Object.keys(regionColumnScoresSD).reduce(
    (memo, year) => [
      ...memo,
      ...getRegionYearDataLow(
        year,
        regionColumnScoresSD,
        regionColumnScoresMean,
        interval,
      ),
    ],
    [],
  );

// prettier-ignore
export const getCountryYearData = (year, countryColumnScores) =>
  countryColumnScores[year]
    ? [({
      syear: year,
      x: getXTime(year),
      y: parseFloat(countryColumnScores[year].score),
    })]
    : [];
// const getCountryData = (country, scores, metricType, benchmarkKey, intl) => {
export const getCountryData = countryColumnScores =>
  Object.keys(countryColumnScores).reduce(
    (memo, year) => [...memo, ...getCountryYearData(year, countryColumnScores)],
    [],
  );

export const sortRegions = (regionA, regionB, priorityRegion) => {
  if (regionA === priorityRegion) return 1;
  if (regionB === priorityRegion) return -1;
  return 1;
};

export const getRegionYearScore = (year, scores, type, intl) => {
  const data = getRegionYearData(year, scores);
  if (data.length > 0) {
    return formatScoreMax(
      data[0].y,
      type === 'esr' ? 100 : 10,
      1,
      false,
      // type !== 'esr',
      intl,
    );
  }
  return 'N/A';
};
export const getRegionYearCount = (year, scores) => {
  const data = getRegionYearData(year, scores);
  return data.length > 0 ? data[0].count : 0;
};
