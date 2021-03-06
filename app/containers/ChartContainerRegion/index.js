/**
 *
 * ChartContainerRegion
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';

import { RIGHTS, PATHS, GRADES } from 'containers/App/constants';

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
import Hint from 'styled/Hint';

import getMetricDetails from 'utils/metric-details';
import { isMinSize, isMaxSize } from 'utils/responsive';
import { getMaxScore } from 'utils/scores';
// import { CARD_WIDTH } from 'theme';
import rootMessages from 'messages';

// prettier-ignore
const MultiCardWrapper = styled(Box)`
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    max-width: calc(100% + ${({ theme }) => {
    const value = parseInt(theme.global.edgeSize.xsmall.split('px')[0], 10);
    return value * 2;
  }}px);
  }
`;

const StyledButton = styled(p => <ButtonText hint size="xxsmall" {...p} />)``;

const getCardNumber = size => {
  if (isMinSize(size, 'large')) return 3;
  if (isMinSize(size, 'medium')) return 2;
  return 1;
};
const getCardWidth = (width, number, theme) => {
  const edge = parseInt(theme.global.edgeSize.xsmall.split('px')[0], 10);
  return `${(width - edge) / number}px`;
};

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores', 'vdemScores'];
export function ChartContainerRegion({
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
  intl,
}) {
  const ref = useRef(null);
  const [gridWidth, setGridWidth] = useState(null);
  const [highlightYear, setYear] = useState(null);
  const [highlightRegion, setRegion] = useState(null);

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
            pad={{ top: isMaxSize(size, 'ms') ? 'xsmall' : '0' }}
            align="center"
            responsive={false}
            margin={isMinSize(size, 'medium') ?
              { horizontal: `-${theme.global.edgeSize.xsmall}` } : {}
            }
            ref={ref}
          >
            {gridWidth && (
              <Box
                direction={isMinSize(size, 'medium') ? 'row' : 'column'}
                wrap={isMinSize(size, 'medium')}
                overflow={isMaxSize(size, 'sm') ? 'hidden' : 'visible'}
                align="center"
                fill="horizontal"
              >
                {rightsScores.map(right => (
                  <WrapPlot
                    key={right.key}
                    width={
                      isMinSize(size, 'medium') ?
                        getCardWidth(
                          gridWidth,
                          getCardNumber(size),
                          theme,
                        ) : null
                    }
                  >
                    <ChartMetricTrend
                      mode="multi-region"
                      scores={right.scores}
                      maxYear={maxYear}
                      minYear={minYear}
                      maxValue={getMaxScore(type)}
                      benchmark={benchmark}
                      metric={getMetricDetails(right.key)}
                      onSelectMetric={(tab, year) => onSelectMetric(right.key, tab, year)}
                      onSelectPage={onSelectPage}
                      currentRegion={(!unRegionFilterValue || unRegionFilterValue === 'all') ? 'world' : unRegionFilterValue}
                      onSetRegionFilter={onSetRegionFilter}
                      unRegionTotals={unRegionTotals}
                      setHighlightYear={setYear}
                      highlightYear={highlightYear}
                      setHighlightRegion={setRegion}
                      highlightRegion={highlightRegion}
                    />
                  </WrapPlot>
                ))}
              </Box>
            )}
          </MultiCardWrapper>
          {(type === 'esr' || type === 'cpr') && (
            <Box gap="xxsmall" align="start" margin={{ bottom: 'small'}}>
              {isMinSize(size, 'medium') && type === 'cpr' && (
                <Box gap="xsmall" direction="row">
                  <Hint size="xxsmall" as="span">
                    <FormattedMessage {...rootMessages.charts.gradesCPRWithLink} />
                  </Hint>
                  {GRADES.cpr
                    .sort((a, b) => (a.min > b.min ? 1 : -1))
                    .map(g => (
                      <Hint size="xxsmall" key={g.class}>
                        <FormattedMessage
                          {...rootMessages.charts.gradeBracket}
                          values={{
                            grade: intl.formatMessage(
                              rootMessages.labels.grades[g.class],
                            ),
                            min: g.min,
                            max: g.max,
                            unit: '',
                          }}
                        />
                      </Hint>
                    ))}
                </Box>
              )}
              {isMinSize(size, 'medium') && type === 'esr' && (
                <Box gap="xsmall" direction="row">
                  <Hint size="xxsmall" as="span">
                    <FormattedMessage {...rootMessages.charts.gradesESRWithLink} />
                  </Hint>
                  {GRADES.esr
                    .sort((a, b) => (a.min > b.min ? 1 : -1))
                    .map(g => (
                      <Hint size="xxsmall" key={g.class}>
                        <FormattedMessage
                          {...rootMessages.charts.gradeBracket}
                          values={{
                            grade: intl.formatMessage(
                              rootMessages.labels.grades[g.class],
                            ),
                            min: g.min,
                            max: g.max,
                            unit: '%',
                          }}
                        />
                      </Hint>
                    ))}
                </Box>
              )}
              {type === 'esr' && (
                <Hint size="xxsmall">
                  <FormattedMessage {...rootMessages.charts.noteRegionalBiasESR} />
                </Hint>
              )}
              {type === 'esr' && (
                <StyledButton
                  onClick={() => onSelectPage('methodology-esr')}
                >
                  <FormattedMessage
                    {...rootMessages.charts.methodologyLink}
                  />
                </StyledButton>
              )}
              {isMinSize(size, 'ms') && type === 'cpr' && (
                <StyledButton
                  onClick={() => onSelectPage('methodology-cpr')}
                >
                  <FormattedMessage
                    {...rootMessages.charts.methodologyLink}
                  />
                </StyledButton>
              )}
            </Box>
          )}
          <Source type={type} />
        </div>
      )}
    </ResponsiveContext.Consumer>
  );
}

ChartContainerRegion.propTypes = {
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
  intl: intlShape.isRequired,
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
    onSelectMetric: (code, tab, year) =>
      dispatch(selectMetric({ code, tab, year })),
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

export default compose(withConnect)(
  withTheme(injectIntl(ChartContainerRegion)),
);
