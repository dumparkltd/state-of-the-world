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
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import { Box, ResponsiveContext, Heading, Text } from 'grommet';
import { Share } from 'grommet-icons';

import {
  PATHS,
  RIGHTS,
  COLUMNS,
  STANDARDS,
  INCOME_GROUPS,
} from 'containers/App/constants';

import {
  getCountry,
  getDependenciesReady,
  getMaxYearESR,
  getMinYearESR,
  getMaxYearCPR,
  getMinYearCPR,
  getMaxYearVDEM,
  getMinYearVDEM,
  getESRScoresForCountry,
  getESRScoresForCountryUNRegion,
  getCPRScoresForCountry,
  getCPRScoresForCountryUNRegion,
  getVDEMScoresForCountry,
  getVDEMScoresForCountryUNRegion,
  getBenchmarkSearch,
  getStandardSearch,
  getHasOtherESRScoresForCountry,
} from 'containers/App/selectors';
import { loadDataIfNeeded, removeNote, navigate } from 'containers/App/actions';

import ChartMetricTrend from 'components/ChartMetricTrend';
import ChartHeader from 'components/ChartHeader';
import NarrativeESRStandardHint from 'components/CountryNarrative/NarrativeESRStandardHint';
import NarrativeESRNoData from 'components/CountryNarrative/NarrativeESRNoData';
import NarrativeCPRNoData from 'components/CountryNarrative/NarrativeCPRNoData';
import NarrativeVDEMNoData from 'components/CountryNarrative/NarrativeVDEMNoData';
import NarrativeCPRGovRespondents from 'components/CountryNarrative/NarrativeCPRGovRespondents';
import Source from 'components/Source';
import WrapPlot from 'styled/WrapPlot';
import ButtonTextIcon from 'styled/ButtonTextIcon';

import getMetricDetails from 'utils/metric-details';
import { isMinSize, isMaxSize } from 'utils/responsive';
import quasiEquals from 'utils/quasi-equals';
// import { CARD_WIDTH } from 'theme';
import rootMessages from 'messages';

import LoadingIndicator from 'components/LoadingIndicator';

import messages from './messages';

// prettier-ignore
const MultiCardWrapper = styled(Box)`
  max-width: calc(100% + ${({ theme }) => {
    const value = parseInt(theme.global.edgeSize.xsmall.split('px')[0], 10);
    return value * 2;
  }}px);
`;
const StyledText = styled(Text)`
  font-weight: 600;
  line-height: ${({ theme }) => theme.text.small.height};
  margin: 1em 0;
`;
const WrapSource = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding-right: ${({ theme }) => theme.global.edgeSize.xsmall};
    padding-left: ${({ theme }) => theme.global.edgeSize.xsmall};
  }
`;

const getCardNumber = size => (isMinSize(size, 'large') ? 3 : 1);
const getCardWidth = (width, number, theme) => {
  const edge = parseInt(theme.global.edgeSize.xsmall.split('px')[0], 10);
  return `${width / number - edge * 2}px`;
};

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores', 'vdemScores'];

export function ChartContainerCountry({
  dataReady,
  onLoadData,
  country,
  scores,
  regionScores,
  benchmark,
  standard,
  maxYearESR,
  minYearESR,
  maxYearCPR,
  minYearCPR,
  maxYearVDEM,
  minYearVDEM,
  onSelectMetric,
  onSelectPage,
  theme,
  messageValues,
  hasOtherESR,
  intl,
  countryCode,
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
  // check standard
  const countryIncomeGroup = INCOME_GROUPS.options.find(s =>
    quasiEquals(s.value, country[COLUMNS.COUNTRIES.HIGH_INCOME]),
  );
  const isRecommendedStandard = countryIncomeGroup.standard === standard;
  const otherStandard = STANDARDS.find(s => !quasiEquals(standard, s.key));

  const scoresESR = scores.filter(r => r.type === 'esr');
  const scoresCPR = scores.filter(r => r.type === 'cpr');
  const scoresVDEM = scores.filter(r => r.type === 'vdem');
  // check data availability
  const hasESR = scores.some(
    r =>
      r.type === 'esr' &&
      r.scores[benchmark] &&
      Object.values(r.scores[benchmark]).length > 0,
  );
  const hasCPR = scores.some(
    r =>
      r.type === 'cpr' &&
      r.scores[COLUMNS.CPR.MEAN] &&
      Object.values(r.scores[COLUMNS.CPR.MEAN]).length > 0,
  );

  const hasVDEM = scores.some(
    r =>
      r.type === 'vdem' &&
      r.scores[COLUMNS.VDEM.MEAN] &&
      Object.values(r.scores[COLUMNS.VDEM.MEAN]).length > 0,
  );
  const hasGovRespondents =
    hasCPR && quasiEquals(country[COLUMNS.COUNTRIES.GOV_RESPONDENTS], 1);

  return (
    <div ref={ref}>
      <ResponsiveContext.Consumer>
        {size => (
          <div>
            <Box margin={{ top: 'medium' }}>
              <Heading level={1}>
                <FormattedMessage {...messages.title} values={messageValues} />
              </Heading>
            </Box>
            <Box margin={{ top: 'medium', bottom: 'large' }}>
              <h2>
                <FormattedMessage {...messages.titleESR} />
              </h2>
              <ChartHeader settings={[{ attribute: 'standard' }]} />
              {!isRecommendedStandard && hasOtherESR && hasESR && (
                <NarrativeESRStandardHint
                  country={country}
                  standard={standard}
                  messageValues={messageValues}
                />
              )}
              {!hasESR && (
                <NarrativeESRNoData
                  hasScoreForOtherStandard={hasOtherESR}
                  isRecommendedStandard={isRecommendedStandard}
                  messageValues={messageValues}
                  otherStandard={otherStandard.key}
                />
              )}
              <MultiCardWrapper
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
                    {scoresESR.map(right => {
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
                            onSelectPage={onSelectPage}
                            currentRegion={country[COLUMNS.COUNTRIES.UN_REGION]}
                          />
                        </WrapPlot>
                      );
                    })}
                  </Box>
                )}
                <WrapSource>
                  <Source type="esr" />
                </WrapSource>
              </MultiCardWrapper>
              <ButtonTextIcon
                href={intl.formatMessage(messages.rightsTrackerCountryURL, {
                  url: intl.formatMessage(
                    rootMessages.sources.urlRightsTracker,
                  ),
                  countryCode,
                  standard,
                })}
                target="_blank"
                size="small"
                margin={{ vertical: 'xxsmall' }}
                gap="small"
                icon={<Share size="small" />}
                label={
                  <StyledText size="small">
                    {intl.formatMessage(
                      messages.seeRightsTracker,
                      messageValues,
                    )}
                  </StyledText>
                }
              />
            </Box>
            <Box>
              <h2>
                <FormattedMessage {...messages.titleCPR} />
              </h2>
              {!hasCPR && <NarrativeCPRNoData messageValues={messageValues} />}
              {hasCPR && hasGovRespondents && (
                <NarrativeCPRGovRespondents messageValues={messageValues} />
              )}
              {hasCPR && (
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
                      overflow={
                        isMaxSize(size, 'medium') ? 'hidden' : 'visible'
                      }
                      align="start"
                    >
                      {scoresCPR.map(right => {
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
                              onSelectPage={onSelectPage}
                              currentRegion={
                                country[COLUMNS.COUNTRIES.UN_REGION]
                              }
                            />
                          </WrapPlot>
                        );
                      })}
                    </Box>
                  )}
                  <WrapSource>
                    <Source type="cpr" />
                  </WrapSource>
                </MultiCardWrapper>
              )}
            </Box>
            <Box>
              <h2>
                <FormattedMessage {...messages.titleVDEM} />
              </h2>
              {!hasVDEM && (
                <NarrativeVDEMNoData messageValues={messageValues} />
              )}
              {hasVDEM && (
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
                      overflow={
                        isMaxSize(size, 'medium') ? 'hidden' : 'visible'
                      }
                      align="start"
                    >
                      {scoresVDEM.map(right => {
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
                              maxYear={maxYearVDEM}
                              minYear={minYearVDEM}
                              maxValue={1}
                              minValue={0}
                              benchmark={benchmark}
                              metric={getMetricDetails(right.key)}
                              mode="multi-country"
                              onSelectMetric={() => onSelectMetric(right.key)}
                              onSelectPage={onSelectPage}
                              currentRegion={
                                country[COLUMNS.COUNTRIES.UN_REGION]
                              }
                            />
                          </WrapPlot>
                        );
                      })}
                    </Box>
                  )}
                  <WrapSource>
                    <Source type="vdem" />
                  </WrapSource>
                </MultiCardWrapper>
              )}
            </Box>
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
  maxYearVDEM: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  minYearVDEM: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  scores: PropTypes.array,
  hasOtherESR: PropTypes.bool,
  regionScores: PropTypes.array,
  dataReady: PropTypes.bool,
  benchmark: PropTypes.string,
  standard: PropTypes.string,
  countryCode: PropTypes.string,
  country: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  theme: PropTypes.object,
  messageValues: PropTypes.object,
  onSelectMetric: PropTypes.func,
  onSelectPage: PropTypes.func,
  intl: intlShape.isRequired,
};
const mapStateToProps = createStructuredSelector({
  country: (state, { countryCode }) => getCountry(state, countryCode),
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  benchmark: state => getBenchmarkSearch(state),
  standard: state => getStandardSearch(state),
  // prettier-ignore
  scores: (state, { countryCode }) =>
    RIGHTS.map(right => {
      let scores;
      if (right.type === 'esr') {
        scores = getESRScoresForCountry(state, {
          countryCode,
          metricCode: right.key,
        })
      } else if (right.type === 'cpr') {
        scores = getCPRScoresForCountry(state, {
          countryCode,
          metricCode: right.key,
        });
      } else if (right.type === 'vdem') {
        scores = getVDEMScoresForCountry(state, {
          countryCode,
          metricCode: right.key,
        });
      }
      return {
        ...right,
        scores,
      };
    }),
  hasOtherESR: (state, { countryCode }) =>
    RIGHTS.filter(right => right.type === 'esr').some(right =>
      getHasOtherESRScoresForCountry(state, {
        countryCode,
        metricCode: right.key,
      }),
    ),
  // prettier-ignore
  regionScores: (state, { countryCode }) =>
    RIGHTS.map(right => {
      let scores;
      if (right.type === 'esr') {
        scores = getESRScoresForCountryUNRegion(state, {
          countryCode,
          metricCode: right.key,
        })
      } else if (right.type === 'cpr') {
        scores = getCPRScoresForCountryUNRegion(state, {
          countryCode,
          metricCode: right.key,
        });
      } else if (right.type === 'vdem') {
        scores = getVDEMScoresForCountryUNRegion(state, {
          countryCode,
          metricCode: right.key,
        });
      }
      return {
        ...right,
        scores,
      };
    }),
  maxYearESR: state => getMaxYearESR(state),
  minYearESR: state => getMinYearESR(state),
  maxYearCPR: state => getMaxYearCPR(state),
  minYearCPR: state => getMinYearCPR(state),
  maxYearVDEM: state => getMaxYearVDEM(state),
  minYearVDEM: state => getMinYearVDEM(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectPage: key => dispatch(navigate(`${PATHS.PAGE}/${key}`)),
    onDismissNote: key => dispatch(removeNote(key)),
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(
  withTheme(injectIntl(ChartContainerCountry)),
);
