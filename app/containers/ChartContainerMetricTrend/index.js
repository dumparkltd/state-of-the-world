/**
 *
 * ChartContainerMetricTrend
 *
 */

import React, { useEffect, useState } from 'react';
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
  getVDEMScoresForUNRegionsCountries,
  getMaxYearESR,
  getMaxYearCPR,
  getMaxYearVDEM,
  getMinYearESR,
  getMinYearCPR,
  getMinYearVDEM,
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

import { lowerCase } from 'utils/string';
import { getMaxXScore, getMinXScore } from 'utils/scores';

import rootMessages from 'messages';
import messages from './messages';

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores', 'vdemScores'];

export function ChartContainerMetricTrend({
  metric,
  scores,
  onLoadData,
  benchmark,
  maxYear,
  minYear,
  unRegionFilterValue,
  onCountryClick,
  unRegionTotals,
  onSelectMetric,
  onSelectPage,
  onSetRegionFilter,
  intl,
  activeCode,
}) {
  const [highlightYear, setYear] = useState(null);
  const [highlightRegion, setRegion] = useState(null);

  useEffect(() => {
    onLoadData();
  }, []);

  // const isESR = metric.type === 'esr';
  if (!scores) return null;
  // prettier-ignore
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
          metric.type === 'esr'
            ? [
              {
                attribute: 'standard',
              },
            ]
            : []
        }
      />
      <ChartMetricTrend
        mode="detail-region"
        scores={scores}
        maxYear={maxYear}
        minYear={minYear}
        maxValue={getMaxXScore(metric.type)}
        minValue={getMinXScore(metric.type)}
        benchmark={benchmark}
        metric={metric}
        onSelectMetric={(tab, year) => onSelectMetric(metric.key, tab, year)}
        currentRegion={unRegionFilterValue || 'world'}
        onCountryClick={onCountryClick}
        onSetRegionFilter={onSetRegionFilter}
        unRegionTotals={unRegionTotals}
        onSelectPage={onSelectPage}
        setHighlightYear={setYear}
        highlightYear={highlightYear}
        setHighlightRegion={setRegion}
        highlightRegion={highlightRegion}
        activeCountry={activeCode}
      />
      <Source type={metric.type} />
    </div>
  );
}

ChartContainerMetricTrend.propTypes = {
  maxYear: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  minYear: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.string,
  onLoadData: PropTypes.func,
  metric: PropTypes.object.isRequired,
  scores: PropTypes.object,
  theme: PropTypes.object,
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onCountryClick: PropTypes.func,
  unRegionTotals: PropTypes.object,
  onSelectMetric: PropTypes.func,
  onSelectPage: PropTypes.func,
  onSetRegionFilter: PropTypes.func,
  activeCode: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  maxYear: (state, { metric }) => {
    if (metric.type === 'esr') return getMaxYearESR(state);
    if (metric.type === 'cpr') return getMaxYearCPR(state);
    if (metric.type === 'vdem') return getMaxYearVDEM(state);
    return false;
  },
  minYear: (state, { metric }) => {
    if (metric.type === 'esr') return getMinYearESR(state);
    if (metric.type === 'cpr') return getMinYearCPR(state);
    if (metric.type === 'vdem') return getMinYearVDEM(state);
    return false;
  },
  benchmark: state => getBenchmarkSearch(state),
  unRegionFilterValue: state => getUNRegionSearch(state),
  scores: (state, { metric }) => {
    if (metric.type === 'esr') {
      return getESRScoresForUNRegionsCountries(state, {
        metricCode: metric.key,
      });
    }
    if (metric.type === 'cpr') {
      return getCPRScoresForUNRegionsCountries(state, {
        metricCode: metric.key,
      });
    }
    return getVDEMScoresForUNRegionsCountries(state, {
      metricCode: metric.key,
    });
  },
  unRegionTotals: state => getUNRegionTotals(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectPage: key => dispatch(navigate(`${PATHS.PAGE}/${key}`)),
    onSelectMetric: (code, tab, year) =>
      dispatch(selectMetric({ code, tab, year })),
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
  withTheme(injectIntl(ChartContainerMetricTrend)),
);
