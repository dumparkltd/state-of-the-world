/**
 *
 * ChartContainerRegionMetricTrend
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withTheme } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Text } from 'grommet';
// import { BENCHMARKS, COLUMNS } from 'containers/App/constants';
import {
  getBenchmarkSearch,
  getESRScoresForUNRegions,
  getCPRScoresForUNRegions,
  getMaxYearESR,
  getMaxYearCPR,
  getMinYearESR,
  getMinYearCPR,
} from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';

import ChartRegionMetricTrend from 'components/ChartRegionMetricTrend';

import getMetricDetails from 'utils/metric-details';

import rootMessages from 'messages';

const getColour = metric => {
  if (metric.metricType === 'dimensions') {
    return metric.key;
  }
  if (metric.metricType === 'rights') {
    return metric.dimension;
  }
  return 'esr';
};

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores'];

export function ChartContainerRegionMetricTrend({
  metricCode,
  scores,
  onLoadData,
  benchmark,
  maxYearESR,
  maxYearCPR,
  minYearESR,
  minYearCPR,
  theme,
}) {
  useEffect(() => {
    onLoadData();
  }, []);

  const metric = getMetricDetails(metricCode);
  const isESR = metric.type === 'esr';

  if (!scores) return null;
  return (
    <div>
      <div>
        <Text weight={700}>
          <FormattedMessage {...rootMessages.rights[metric.key]} />
        </Text>
      </div>
      <ChartRegionMetricTrend
        color={getColour(metric)}
        colorCode={theme.global.colors[getColour(metric)]}
        colorHint={`${getColour(metric)}Dark`}
        scores={scores}
        percentage={isESR}
        maxValue={isESR ? 100 : 11}
        maxYear={isESR ? maxYearESR : maxYearCPR}
        minYear={isESR ? minYearESR : minYearCPR}
        hasBenchmarkOption={isESR}
        benchmark={benchmark}
        metric={metric}
      />
    </div>
  );
}

ChartContainerRegionMetricTrend.propTypes = {
  maxYearESR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  maxYearCPR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  minYearESR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  minYearCPR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.string,
  onLoadData: PropTypes.func,
  metricCode: PropTypes.string.isRequired,
  scores: PropTypes.object,
  theme: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  maxYearESR: state => getMaxYearESR(state),
  maxYearCPR: state => getMaxYearCPR(state),
  minYearESR: state => getMinYearESR(state),
  minYearCPR: state => getMinYearCPR(state),
  benchmark: state => getBenchmarkSearch(state),
  scores: (state, { metricCode, standard }) => {
    const metric = getMetricDetails(metricCode);
    if (metric.type === 'esr') {
      return getESRScoresForUNRegions(state, { metricCode, standard });
    }
    return getCPRScoresForUNRegions(state, { metricCode });
  },
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withTheme(ChartContainerRegionMetricTrend));
