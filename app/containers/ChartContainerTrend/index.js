/**
 *
 * ChartContainerTrend
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withTheme } from 'styled-components';

import { COLUMNS } from 'containers/App/constants';
import {
  getStandardSearch,
  getBenchmarkSearch,
  getESRScoresForCountry,
  getCPRScoresForCountry,
  getMaxYearESR,
  getMaxYearCPR,
  getMinYearESR,
  getMinYearCPR,
} from 'containers/App/selectors';
import {
  navigate,
  loadDataIfNeeded,
  setStandard,
} from 'containers/App/actions';

import ChartCountryMetricTrend from 'components/ChartCountryMetricTrend';

import getMetricDetails from 'utils/metric-details';

const getColour = metric => {
  if (metric.metricType === 'dimensions') {
    return metric.key;
  }
  if (metric.metricType === 'rights') {
    return metric.dimension;
  }
  return 'esr';
};

const getTrendColumn = isESR => {
  if (isESR) return COLUMNS.ESR.RAW;
  return COLUMNS.CPR.MEAN;
};

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores'];

export function ChartContainerTrend({
  metricCode,
  scores,
  onLoadData,
  benchmark,
  standard,
  maxYearESR,
  maxYearCPR,
  minYearESR,
  minYearCPR,
  theme,
  onSetStandard,
}) {
  useEffect(() => {
    onLoadData();
  }, []);

  const metric = getMetricDetails(metricCode);
  const isESR = metric.type === 'esr';

  // prettier-ignore
  return (
    <ChartCountryMetricTrend
      color={getColour(metric)}
      colorCode={theme.global.colors[getColour(metric)]}
      colorHint={`${getColour(metric)}Dark`}
      scores={scores}
      percentage={isESR}
      maxValue={isESR ? 100 : 11}
      maxYear={isESR ? maxYearESR : maxYearCPR}
      minYear={isESR ? minYearESR : minYearCPR}
      column={getTrendColumn(isESR)}
      rangeColumns={
        !isESR && {
          upper: COLUMNS.CPR.HI,
          lower: COLUMNS.CPR.LO,
        }
      }
      hasStandardOption={isESR}
      onSetStandard={onSetStandard}
      standard={standard}
      benchmark={benchmark}
      metric={metric}
    />
  );
}

ChartContainerTrend.propTypes = {
  maxYearESR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  maxYearCPR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  minYearESR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  minYearCPR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  standard: PropTypes.string,
  benchmark: PropTypes.string,
  onSetStandard: PropTypes.func,
  onLoadData: PropTypes.func,
  metricCode: PropTypes.string.isRequired,
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  maxYearESR: state => getMaxYearESR(state),
  maxYearCPR: state => getMaxYearCPR(state),
  minYearESR: state => getMinYearESR(state),
  minYearCPR: state => getMinYearCPR(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  scores: (state, { countryCode, metricCode }) => {
    const metric = getMetricDetails(metricCode);
    if (metric.type === 'esr') {
      return getESRScoresForCountry(state, {
        countryCode,
        metric,
      });
    }
    return getCPRScoresForCountry(state, {
      countryCode,
      metric,
    });
  },
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
    onCategoryClick: (key, value) => {
      const deleteParams = ['income', 'unregion', 'assessed'];
      dispatch(
        navigate(
          { pathname: '', search: `?${key}=${value}` },
          {
            replace: false,
            deleteParams: deleteParams.filter(p => p !== key),
            trackEvent: {
              category: 'Data',
              action: 'Country filter (country-metric, tags)',
              value: `${key}/${value}`,
            },
          },
        ),
      );
    },
    onSetStandard: value => dispatch(setStandard(value)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withTheme(ChartContainerTrend));
