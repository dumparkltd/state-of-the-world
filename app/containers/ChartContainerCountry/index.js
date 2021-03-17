/**
 *
 * ChartContainerCountry
 *
 */

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';

import { RIGHTS, COLUMNS } from 'containers/App/constants';

import {
  getCountry,
  getDependenciesReady,
  getMaxYearESR,
  getMaxYearCPR,
  getMinYearESR,
  getMinYearCPR,
  getESRScoresForCountry,
  getESRScoresForCountryUNRegion,
  getCPRScoresForCountry,
  getCPRScoresForCountryUNRegion,
  getBenchmarkSearch,
} from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';

import ChartMetricTrend from 'components/ChartMetricTrend';
import ChartHeader from 'components/ChartHeader';
import WrapPlot from 'styled/WrapPlot';

import getMetricDetails from 'utils/metric-details';
import { isMinSize, isMaxSize } from 'utils/responsive';
// import { CARD_WIDTH } from 'theme';
import rootMessages from 'messages';
import LoadingIndicator from 'components/LoadingIndicator';

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

const DEPENDENCIES = [
  'countries',
  'countriesGrammar',
  'cprScores',
  'esrScores',
];

export function ChartContainerCountry({
  dataReady,
  onLoadData,
  country,
  // activeMetricCode,
  // messageValues,
  scores,
  regionScores,
  benchmark,
  maxYearESR,
  minYearESR,
  maxYearCPR,
  minYearCPR,
  onSelectMetric,
  theme,
}) {
  const ref = useRef(null);
  const [gridWidth, setGridWidth] = useState(null);

  const handleResize = () =>
    setGridWidth(ref.current ? ref.current.offsetWidth : false);

  useLayoutEffect(() => {
    handleResize();
  }, [dataReady]);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    onLoadData();
  }, []);

  if (!dataReady) return <LoadingIndicator />;

  return (
    <div ref={ref}>
      <ResponsiveContext.Consumer>
        {size => (
          <div>
            <h1>
              <FormattedMessage {...rootMessages['rights-types'].esr} />
            </h1>
            <ChartHeader settings={{ standard: true }} />
            <CardWrapper
              pad={{ top: isMaxSize(size, 'sm') ? 'xsmall' : '0' }}
              align="start"
              responsive={false}
              margin={{ horizontal: `-${theme.global.edgeSize.xsmall}` }}
            >
              {gridWidth && (
                <Box
                  direction="row"
                  wrap
                  overflow={isMaxSize(size, 'medium') ? 'hidden' : 'visible'}
                  align="start"
                >
                  {scores
                    .filter(r => r.type === 'esr')
                    .map(right => {
                      const regionRight = regionScores.find(
                        r => r.key === right.key,
                      );
                      return (
                        <WrapPlot
                          key={right.key}
                          width={getCardWidth(
                            gridWidth || 200,
                            getCardNumber(size),
                            theme,
                          )}
                        >
                          <ChartMetricTrend
                            scores={{
                              country: right.scores,
                              regions: regionRight.scores,
                            }}
                            regionScores={regionScores}
                            maxYear={maxYearESR}
                            minYear={minYearESR}
                            benchmark={benchmark}
                            metric={getMetricDetails(right.key)}
                            mode="multi-country"
                            onSelectMetric={() => onSelectMetric(right.key)}
                            unRegionFilterValue={
                              country[COLUMNS.COUNTRIES.UN_REGION]
                            }
                          />
                        </WrapPlot>
                      );
                    })}
                </Box>
              )}
            </CardWrapper>
            <h1>
              <FormattedMessage {...rootMessages['rights-types'].cpr} />
            </h1>
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
                  align="start"
                >
                  {scores
                    .filter(r => r.type === 'cpr')
                    .map(right => {
                      const regionRight = regionScores.find(
                        r => r.key === right.key,
                      );
                      return (
                        <WrapPlot
                          key={right.key}
                          width={getCardWidth(
                            gridWidth || 200,
                            getCardNumber(size),
                            theme,
                          )}
                        >
                          <ChartMetricTrend
                            scores={{
                              country: right.scores,
                              regions: regionRight.scores,
                            }}
                            maxYear={maxYearCPR}
                            minYear={minYearCPR}
                            maxValue={12}
                            minValue={-1}
                            benchmark={benchmark}
                            metric={getMetricDetails(right.key)}
                            mode="multi-country"
                            onSelectMetric={() => onSelectMetric(right.key)}
                            unRegionFilterValue={
                              country[COLUMNS.COUNTRIES.UN_REGION]
                            }
                          />
                        </WrapPlot>
                      );
                    })}
                </Box>
              )}
            </CardWrapper>
          </div>
        )}
      </ResponsiveContext.Consumer>
    </div>
  );
}

ChartContainerCountry.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  maxYearESR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  minYearESR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  maxYearCPR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  minYearCPR: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  scores: PropTypes.array,
  regionScores: PropTypes.array,
  dataReady: PropTypes.bool,
  benchmark: PropTypes.string,
  country: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  theme: PropTypes.object,
  onSelectMetric: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  country: (state, { countryCode }) => getCountry(state, countryCode),
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  benchmark: state => getBenchmarkSearch(state),
  // prettier-ignore
  scores: (state, { countryCode }) =>
    RIGHTS.map(right => ({
      ...right,
      scores:
        right.type === 'esr'
          ? getESRScoresForCountry(state, {
            countryCode,
            metricCode: right.key,
          })
          : getCPRScoresForCountry(state, {
            countryCode,
            metricCode: right.key,
          }),
    })),
  // prettier-ignore
  regionScores: (state, { countryCode }) =>
    RIGHTS.map(right => ({
      ...right,
      scores:
        right.type === 'esr'
          ? getESRScoresForCountryUNRegion(state, {
            countryCode,
            metricCode: right.key,
          })
          : getCPRScoresForCountryUNRegion(state, {
            countryCode,
            metricCode: right.key,
          }),
    })),
  maxYearESR: state => getMaxYearESR(state),
  minYearESR: state => getMinYearESR(state),
  maxYearCPR: state => getMaxYearCPR(state),
  minYearCPR: state => getMinYearCPR(state),
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

export default compose(withConnect)(withTheme(ChartContainerCountry));
