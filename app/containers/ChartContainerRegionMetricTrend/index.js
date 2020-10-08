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
import { Box, Text } from 'grommet';

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
import { loadDataIfNeeded, setBenchmark } from 'containers/App/actions';

// import ChartRegionMetricTrend from 'components/ChartRegionMetricTrend';

import getMetricDetails from 'utils/metric-details';
import { roundScore } from 'utils/scores';

// const getColour = metric => {
//   if (metric.metricType === 'dimensions') {
//     return metric.key;
//   }
//   if (metric.metricType === 'rights') {
//     return metric.dimension;
//   }
//   return 'esr';
// };
// const getRefs = benchmark => {
//   if (benchmark && benchmark.key === 'adjusted') {
//     return [{ value: 100, style: 'dotted', key: 'adjusted' }];
//   }
//   if (benchmark && benchmark.key === 'best') {
//     return [
//       { value: 100, style: 'solid', key: 'best' },
//       {
//         refColumn: benchmark.refColumn,
//         style: 'dotted',
//         key: 'adjusted',
//       },
//     ];
//   }
//   return false;
// };
//
// const getTrendColumn = (isESR, currentBenchmark) =>
//   isESR ? currentBenchmark.column : COLUMNS.CPR.MEAN;

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores'];

export function ChartContainerRegionMetricTrend({
  metricCode,
  scores,
  onLoadData,
  // benchmark,
  // standard,
  // maxYearESR,
  // maxYearCPR,
  // minYearESR,
  // minYearCPR,
  // theme,
  // onSetBenchmark,
}) {
  useEffect(() => {
    onLoadData();
  }, []);

  // const metric = getMetricDetails(metricCode);
  // const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  // const isESR = metric.type === 'esr';

  // console.log(scores)
  if (!scores) return null;
  return (
    <Box margin={{ bottom: 'medium' }}>
      <Box>
        <Text size="xxlarge">{metricCode}</Text>
      </Box>
      <Box>
        {Object.keys(scores).map(region => (
          <Box key={region} margin={{ bottom: 'small' }}>
            <Box>
              <Text size="large">{region}</Text>
            </Box>
            <div>
              {Object.keys(scores[region]).map(column => (
                <Box key={column} margin={{ bottom: 'small' }}>
                  <div>{column}</div>
                  <Box direction="row" gap="small">
                    {Object.keys(scores[region][column]).map(year => (
                      <Box key={`${column}${year}`}>
                        <Box>{year}</Box>
                        <Box>
                          <strong>
                            {roundScore(scores[region][column][year])}
                          </strong>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
  // return (
  //   <div>
  //     <ChartRegionMetricTrend
  //       color={getColour(metric)}
  //       colorCode={theme.global.colors[getColour(metric)]}
  //       colorHint={`${getColour(metric)}Dark`}
  //       scores={scores}
  //       percentage={isESR}
  //       maxValue={isESR ? 100 : 11}
  //       maxYear={isESR ? maxYearESR : maxYearCPR}
  //       minYear={isESR ? minYearESR : minYearCPR}
  //       column={getTrendColumn(isESR, currentBenchmark)}
  //       rangeColumns={
  //         !isESR && {
  //           upper: COLUMNS.CPR.HI,
  //           lower: COLUMNS.CPR.LO,
  //         }
  //       }
  //       benchmarkRefs={isESR && getRefs(currentBenchmark)}
  //       hasBenchmarkOption={isESR}
  //       hasStandardOption={isESR}
  //       onSetBenchmark={onSetBenchmark}
  //       onSetStandard={onSetStandard}
  //       standard={standard}
  //       benchmark={benchmark}
  //       metric={metric}
  //     />
  //   </div>
  // );
}

ChartContainerRegionMetricTrend.propTypes = {
  // maxYearESR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // maxYearCPR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // minYearESR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // minYearCPR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // standard: PropTypes.string,
  // benchmark: PropTypes.string,
  // onSetStandard: PropTypes.func,
  // onSetBenchmark: PropTypes.func,
  onLoadData: PropTypes.func,
  metricCode: PropTypes.string.isRequired,
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // theme: PropTypes.object,
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
    onSetBenchmark: value => dispatch(setBenchmark(value)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withTheme(ChartContainerRegionMetricTrend));
