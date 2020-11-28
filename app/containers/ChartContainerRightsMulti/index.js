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
// import { FormattedMessage } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';

import { RIGHTS } from 'containers/App/constants';

import {
  getMaxYearESR,
  getMaxYearCPR,
  getMinYearESR,
  getMinYearCPR,
  getBenchmarkSearch,
  getESRScoresForUNRegions,
  getCPRScoresForUNRegions,
  getUNRegionSearch,
} from 'containers/App/selectors';
import { loadDataIfNeeded, navigate } from 'containers/App/actions';

import ChartMetricRegionTrend from 'components/ChartMetricRegionTrend';
import ChartHeader from 'components/ChartHeader';

import getMetricDetails from 'utils/metric-details';
import { isMinSize, isMaxSize } from 'utils/responsive';
// import { CARD_WIDTH } from 'theme';
// import rootMessages from 'messages';

// prettier-ignore
const CardWrapper = styled(Box)`
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

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores'];
export function ChartContainerRightsMulti({
  type,
  onLoadData,
  rightsScores,
  benchmark,
  maxYear,
  minYear,
  unRegionFilterValue,
  onSetRegionFilter,
  theme,
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
  const isESR = type === 'esr';
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <div>
          <ChartHeader
            filters={{ unregion: 'single' }}
            settings={{ standard: type === 'esr' }}
          />
          <CardWrapper
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
                pad={isMaxSize(size, 'medium') ? '40px 0 0' : '20px 0 0'}
                align="start"
              >
                {rightsScores.map(right => (
                  <ChartMetricRegionTrend
                    key={right.key}
                    scores={right.scores}
                    maxYear={maxYear}
                    minYear={minYear}
                    maxValue={isESR ? 100 : 11}
                    benchmark={benchmark}
                    metric={getMetricDetails(right.key)}
                    mode="multi"
                    unRegionFilterValue={unRegionFilterValue || 'world'}
                    onSetRegionFilter={onSetRegionFilter}
                    width={getCardWidth(
                      gridWidth || 200,
                      getCardNumber(size),
                      theme,
                    )}
                  />
                ))}
              </Box>
            )}
          </CardWrapper>
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
  rightsScores: PropTypes.array,
  theme: PropTypes.object,
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  maxYear: (state, { type }) =>
    type === 'esr' ? getMaxYearESR(state) : getMaxYearCPR(state),
  minYear: (state, { type }) =>
    type === 'esr' ? getMinYearESR(state) : getMinYearCPR(state),
  benchmark: state => getBenchmarkSearch(state),
  unRegionFilterValue: state => getUNRegionSearch(state),
  rightsScores: (state, { type }) =>
    RIGHTS.filter(right => right.type === type).map(right => ({
      ...right,
      scores:
        type === 'esr'
          ? getESRScoresForUNRegions(state, { metricCode: right.key })
          : getCPRScoresForUNRegions(state, { metricCode: right.key }),
    })),
});

export function mapDispatchToProps(dispatch) {
  return {
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
