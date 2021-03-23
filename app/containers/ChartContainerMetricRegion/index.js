/**
 *
 * ChartContainerMetricRegion
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withTheme } from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Box, Heading } from 'grommet';

import { PATHS } from 'containers/App/constants';

import {
  getBenchmarkSearch,
  getESRScoresForUNRegionsCountries,
  getCPRScoresForUNRegionsCountries,
  getMaxYearESR,
  getMaxYearCPR,
  getMinYearESR,
  getMinYearCPR,
  getUNRegionSearch,
  getUNRegionTotals,
} from 'containers/App/selectors';
import {
  loadDataIfNeeded,
  selectMetric,
  navigate,
} from 'containers/App/actions';

import ChartMetricTrend from 'components/ChartMetricTrend';
import ChartHeader from 'components/ChartHeader';
import Source from 'components/Source';

import getMetricDetails from 'utils/metric-details';
import { lowerCase } from 'utils/string';

import rootMessages from 'messages';
import messages from './messages';

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores'];

export function ChartContainerMetricRegion({
  metricCode,
  scores,
  onLoadData,
  benchmark,
  maxYearESR,
  maxYearCPR,
  minYearESR,
  minYearCPR,
  unRegionFilterValue,
  onCountryClick,
  unRegionTotals,
  onSelectMetric,
  onSelectPage,
  onSetRegionFilter,
  intl,
}) {
  useEffect(() => {
    onLoadData();
  }, []);

  const metric = getMetricDetails(metricCode);
  const isESR = metric.type === 'esr';

  if (!scores) return null;
  return (
    <div>
      <Box margin={{ top: 'medium' }}>
        <Heading level={1}>
          <FormattedMessage
            {...messages.title}
            values={{
              metric: lowerCase(
                intl.formatMessage(rootMessages.rights[metric.key]),
              ),
            }}
          />
        </Heading>
      </Box>
      <ChartHeader
        filters={[
          {
            attribute: 'unregion',
            type: 'filter',
            all: true,
          },
        ]}
        settings={
          metric.type === 'esr' && [
            {
              attribute: 'standard',
            },
          ]
        }
      />
      <ChartMetricTrend
        mode="detail-region"
        scores={scores}
        maxYear={isESR ? maxYearESR : maxYearCPR}
        minYear={isESR ? minYearESR : minYearCPR}
        maxValue={isESR ? 100 : 12}
        minValue={isESR ? 0 : -1}
        benchmark={benchmark}
        metric={metric}
        onSelectMetric={(tab, year) => onSelectMetric(metric.key, tab, year)}
        unRegionFilterValue={unRegionFilterValue || 'world'}
        onCountryClick={onCountryClick}
        onSetRegionFilter={onSetRegionFilter}
        unRegionTotals={unRegionTotals}
        onSelectPage={onSelectPage}
      />
      <Source type={metric.type} />
    </div>
  );
}

ChartContainerMetricRegion.propTypes = {
  maxYearESR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  maxYearCPR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  minYearESR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  minYearCPR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.string,
  onLoadData: PropTypes.func,
  metricCode: PropTypes.string.isRequired,
  scores: PropTypes.object,
  theme: PropTypes.object,
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onCountryClick: PropTypes.func,
  unRegionTotals: PropTypes.object,
  onSelectMetric: PropTypes.func,
  onSelectPage: PropTypes.func,
  onSetRegionFilter: PropTypes.func,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  maxYearESR: state => getMaxYearESR(state),
  maxYearCPR: state => getMaxYearCPR(state),
  minYearESR: state => getMinYearESR(state),
  minYearCPR: state => getMinYearCPR(state),
  benchmark: state => getBenchmarkSearch(state),
  unRegionFilterValue: state => getUNRegionSearch(state),
  scores: (state, { metricCode }) => {
    const metric = getMetricDetails(metricCode);
    if (metric.type === 'esr') {
      return getESRScoresForUNRegionsCountries(state, { metricCode });
    }
    return getCPRScoresForUNRegionsCountries(state, { metricCode });
  },
  unRegionTotals: state => getUNRegionTotals(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectPage: key => dispatch(navigate(`${PATHS.PAGE}/${key}`)),
    onSelectMetric: (metric, tab, year) =>
      dispatch(selectMetric(metric, tab, year)),
    // prettier-ignore
    onSetRegionFilter: region =>
      dispatch(navigate(
        { search: `?unregion=${region}` },
        {
          replace: false,
          trackEvent: {
            category: 'Data',
            action: 'Region filter (Home)',
            value: `region/${region}`,
          },
        },
      )),
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(
  withTheme(injectIntl(ChartContainerMetricRegion)),
);