/**
 *
 * ChartContainerRightsMulti
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import { Box, ResponsiveContext, Text } from 'grommet';

import { RIGHTS, PATHS } from 'containers/App/constants';

import {
  getMinYearESR,
  getMaxYearESR,
  getMinYearCPR,
  getMaxYearCPR,
  getMinYearVDEM,
  getMaxYearVDEM,
  getBenchmarkSearch,
  getESRScoresForUNRegions,
  getCPRScoresForUNRegions,
  getVDEMScoresForUNRegions,
  getUNRegionSearch,
  getUNRegionTotals,
} from 'containers/App/selectors';
import {
  loadDataIfNeeded,
  navigate,
  selectMetric,
} from 'containers/App/actions';

import ChartMetricTrend from 'components/ChartMetricTrend';
import ChartHeader from 'components/ChartHeader';
import Source from 'components/Source';

import ButtonText from 'styled/ButtonText';
import WrapPlot from 'styled/WrapPlot';

import getMetricDetails from 'utils/metric-details';
import { isMinSize, isMaxSize } from 'utils/responsive';
import { getMaxScore } from 'utils/scores';
// import { CARD_WIDTH } from 'theme';
import rootMessages from 'messages';

// prettier-ignore
const MultiCardWrapper = styled(Box)`
  max-width: calc(100% + ${({ theme }) => {
    const value = parseInt(theme.global.edgeSize.xsmall.split('px')[0], 10);
    return value * 2;
  }}px);
`;

const getCardNumber = size => (isMinSize(size, 'large') ? 3 : 1);
const getCardWidth = (width, number, theme) => {
  const edge = parseInt(theme.global.edgeSize.xsmall.split('px')[0], 10);
  return `${width / number - edge * 2}px`;
};

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores', 'vdemScores'];
export function ChartContainerRightsMulti({
  type,
  onLoadData,
  rightsScores,
  benchmark,
  maxYear,
  minYear,
  unRegionFilterValue,
  onSetRegionFilter,
  onSelectMetric,
  theme,
  unRegionTotals,
  onSelectPage,
}) {
  const ref = useRef(null);
  const [gridWidth, setGridWidth] = useState(null);

  const handleResize = () =>
    setGridWidth(ref.current ? ref.current.offsetWidth : 0);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    onLoadData();
  }, []);

  if (!rightsScores) return null;
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <div>
          <ChartHeader
            filters={[
              {
                attribute: 'unregion',
                type: 'highlight',
              },
            ]}
            settings={
              type === 'esr'
                ? [
                  {
                    attribute: 'standard',
                  },
                ]
                : []
            }
          />
          <MultiCardWrapper
            pad={{ top: isMaxSize(size, 'sm') ? 'xsmall' : '0' }}
            align="start"
            responsive={false}
            margin={{ horizontal: `-${theme.global.edgeSize.xsmall}` }}
            ref={ref}
          >
            {gridWidth && (
              <Box
                direction="row"
                wrap
                overflow={isMaxSize(size, 'medium') ? 'hidden' : 'visible'}
                align="start"
              >
                {rightsScores.map(right => (
                  <WrapPlot
                    key={right.key}
                    width={getCardWidth(
                      gridWidth || 200,
                      getCardNumber(size),
                      theme,
                    )}
                  >
                    <ChartMetricTrend
                      mode="multi-region"
                      scores={right.scores}
                      maxYear={maxYear}
                      minYear={minYear}
                      maxValue={getMaxScore(type)}
                      benchmark={benchmark}
                      metric={getMetricDetails(right.key)}
                      onSelectMetric={(tab, year) =>
                        onSelectMetric(right.key, tab, year)
                      }
                      onSelectPage={onSelectPage}
                      currentRegion={(!unRegionFilterValue || unRegionFilterValue === 'all') ? 'world' : unRegionFilterValue}
                      onSetRegionFilter={onSetRegionFilter}
                      unRegionTotals={unRegionTotals}
                    />
                  </WrapPlot>
                ))}
              </Box>
            )}
          </MultiCardWrapper>
          {type === 'esr' && (
            <Text size="xxsmall" color="dark">
              <FormattedMessage
                {...rootMessages.charts.noteRegionalBiasESR}
                values={{
                  link: (
                    <ButtonText onClick={() => onSelectPage('methodology-esr')}>
                      <FormattedMessage
                        {...rootMessages.charts.noteRegionalBiasESRLink}
                      />
                    </ButtonText>
                  ),
                }}
              />
            </Text>
          )}
          <Source type={type} />
        </div>
      )}
    </ResponsiveContext.Consumer>
  );
}

ChartContainerRightsMulti.propTypes = {
  type: PropTypes.string.isRequired,
  maxYear: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  minYear: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.string,
  onLoadData: PropTypes.func,
  onSetRegionFilter: PropTypes.func,
  onSelectMetric: PropTypes.func,
  onSelectPage: PropTypes.func,
  rightsScores: PropTypes.array,
  theme: PropTypes.object,
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  unRegionTotals: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  maxYear: (state, { type }) => {
    if (type === 'esr') return getMaxYearESR(state);
    if (type === 'cpr') return getMaxYearCPR(state);
    if (type === 'vdem') return getMaxYearVDEM(state);
    return false;
  },
  minYear: (state, { type }) => {
    if (type === 'esr') return getMinYearESR(state);
    if (type === 'cpr') return getMinYearCPR(state);
    if (type === 'vdem') return getMinYearVDEM(state);
    return false;
  },
  benchmark: state => getBenchmarkSearch(state),
  unRegionFilterValue: state => getUNRegionSearch(state),
  rightsScores: (state, { type }) =>
    RIGHTS.filter(right => right.type === type).map(right => {
      let scores;
      if (type === 'esr') {
        scores = getESRScoresForUNRegions(state, { metricCode: right.key });
      } else if (type === 'cpr') {
        scores = getCPRScoresForUNRegions(state, { metricCode: right.key });
      } else if (type === 'vdem') {
        scores = getVDEMScoresForUNRegions(state, { metricCode: right.key });
      }
      return {
        ...right,
        scores,
      };
    }),
  unRegionTotals: state => getUNRegionTotals(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectPage: key => dispatch(navigate(`${PATHS.PAGE}/${key}`)),
    onSelectMetric: (metric, tab, year) =>
      dispatch(selectMetric(metric, tab, year)),
    // prettier-ignore
    onSetRegionFilter: region =>
      dispatch(
        region
          ? navigate(
            { search: `?unregion=${region}` },
            {
              replace: false,
              trackEvent: {
                category: 'Data',
                action: 'Region filter (Home)',
                value: `region/${region}`,
              },
            },
          )
          : navigate(
            {},
            {
              replace: false,
              deleteParams: [{ key: 'unregion' }],
              trackEvent: {
                category: 'Data',
                action: 'Region filter (Home)',
                value: `region/${region}`,
              },
            },
          ),
      ),
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withTheme(ChartContainerRightsMulti));
