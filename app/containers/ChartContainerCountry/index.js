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
  TYPES,
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
import ContentTitle from 'styled/ContentTitle';
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
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    max-width: calc(100% + ${({ theme }) => {
    const value = parseInt(theme.global.edgeSize.xsmall.split('px')[0], 10);
    return value * 2;
  }}px);
  }
`;
const StyledText = styled(Text)`
  font-weight: 600;
  line-height: ${({ theme }) => theme.text.small.height};
`;

const Section = styled(p => <Box margin={{ vertical: 'medium' }} {...p} />)``;
const SectionTitle = styled(p => (
  <Heading level={3} margin={{ bottom: 'medium' }} {...p} />
))`
  font-weight: 700;
`;

const getCardNumber = size => {
  if (isMinSize(size, 'xlarge')) return 3;
  if (isMinSize(size, 'medium')) return 2;
  return 1;
};

const getCardWidth = (width, number, theme) => {
  const edge = parseInt(theme.global.edgeSize.xsmall.split('px')[0], 10);
  return `${(width - edge) / number}px`;
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
  const [highlightYear, setYear] = useState(null);

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

  // prettier-ignore
  return (
    <div ref={ref}>
      <ResponsiveContext.Consumer>
        {size => (
          <div>
            <Box margin={{ top: 'medium' }}>
              <ContentTitle>
                <FormattedMessage {...messages.title} values={messageValues} />
              </ContentTitle>
            </Box>
            <Section margin={{ bottom: 'large' }}>
              <SectionTitle margin={{ top: 'small', bottom: 'hair' }}>
                <FormattedMessage {...messages.titleESR} />
              </SectionTitle>
              {(hasESR || hasOtherESR) && (
                <ChartHeader settings={[{ attribute: 'standard' }]} />
              )}
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
              {(hasESR || hasOtherESR) && (
                <MultiCardWrapper
                  pad={{ top: isMaxSize(size, 'ms') ? 'xsmall' : '0' }}
                  align="center"
                  responsive={false}
                  margin={
                    isMinSize(size, 'large')
                      ? { horizontal: `-${theme.global.edgeSize.xsmall}` }
                      : {}
                  }
                >
                  {gridWidth && (
                    <Box
                      direction={isMinSize(size, 'medium') ? 'row' : 'column'}
                      wrap={isMinSize(size, 'medium')}
                      overflow={
                        isMaxSize(size, 'sm') ? 'hidden' : 'visible'
                      }
                      align="center"
                      fill="horizontal"
                    >
                      {scoresESR.map(right => {
                        const regionRight = regionScores.find(
                          r => r.key === right.key,
                        );
                        return (
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
                              scores={{
                                country: right.scores,
                                regions: regionRight.scores,
                              }}
                              regionScores={regionScores}
                              maxYear={maxYearESR}
                              minYear={minYearESR}
                              maxValue={TYPES.esr.max}
                              benchmark={benchmark}
                              metric={getMetricDetails(right.key)}
                              mode="multi-country"
                              onSelectMetric={() => onSelectMetric(right.key)}
                              onSelectPage={onSelectPage}
                              currentRegion={
                                country[COLUMNS.COUNTRIES.UN_REGION]
                              }
                              setHighlightYear={setYear}
                              highlightYear={highlightYear}
                            />
                          </WrapPlot>
                        );
                      })}
                    </Box>
                  )}
                </MultiCardWrapper>
              )}
              {(hasESR || hasOtherESR) && (
                <Source type="esr" />
              )}
              {(hasESR || hasOtherESR) && (
                <div>
                  <Text size="small">
                    <FormattedMessage {...messages.seeRightsTracker} />
                  </Text>
                  {` `}
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
                    gap="xsmall"
                    icon={<Share size="small" />}
                    label={
                      <StyledText size="small">
                        {intl.formatMessage(
                          messages.seeRightsTrackerLink,
                          messageValues,
                        )}
                      </StyledText>
                    }
                  />
                  {`.`}
                </div>
              )}
            </Section>
            <Section>
              <SectionTitle>
                <FormattedMessage {...messages.titleCPR} />
              </SectionTitle>
              {!hasCPR && <NarrativeCPRNoData messageValues={messageValues} />}
              {hasCPR && hasGovRespondents && (
                <NarrativeCPRGovRespondents messageValues={messageValues} />
              )}
              {hasCPR && (
                <MultiCardWrapper
                  pad={{ top: isMaxSize(size, 'ms') ? 'xsmall' : '0' }}
                  align="center"
                  responsive={false}
                  margin={
                    isMinSize(size, 'large')
                      ? { horizontal: `-${theme.global.edgeSize.xsmall}` }
                      : {}
                  }
                >
                  {gridWidth && (
                    <Box
                      direction={isMinSize(size, 'medium') ? 'row' : 'column'}
                      wrap={isMinSize(size, 'medium')}
                      overflow={
                        isMaxSize(size, 'sm') ? 'hidden' : 'visible'
                      }
                      align="center"
                      fill="horizontal"
                    >
                      {scoresCPR.map(right => {
                        const regionRight = regionScores.find(
                          r => r.key === right.key,
                        );
                        return (
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
                              scores={{
                                country: right.scores,
                                regions: regionRight.scores,
                              }}
                              maxYear={maxYearCPR}
                              minYear={minYearCPR}
                              maxValue={TYPES.cpr.maxX}
                              minValue={TYPES.cpr.minX}
                              benchmark={benchmark}
                              metric={getMetricDetails(right.key)}
                              mode="multi-country"
                              onSelectMetric={() => onSelectMetric(right.key)}
                              onSelectPage={onSelectPage}
                              currentRegion={
                                country[COLUMNS.COUNTRIES.UN_REGION]
                              }
                              setHighlightYear={setYear}
                              highlightYear={highlightYear}
                            />
                          </WrapPlot>
                        );
                      })}
                    </Box>
                  )}
                </MultiCardWrapper>
              )}
              {hasCPR && (
                <Source type="cpr" />
              )}
            </Section>
            <Section>
              <SectionTitle>
                <FormattedMessage {...messages.titleVDEM} />
              </SectionTitle>
              {!hasVDEM && (
                <NarrativeVDEMNoData messageValues={messageValues} />
              )}
              {hasVDEM && (
                <MultiCardWrapper
                  pad={{ top: isMaxSize(size, 'ms') ? 'xsmall' : '0' }}
                  align="center"
                  responsive={false}
                  margin={
                    isMinSize(size, 'large')
                      ? { horizontal: `-${theme.global.edgeSize.xsmall}` }
                      : {}
                  }
                >
                  {gridWidth && (
                    <Box
                      direction={isMinSize(size, 'medium') ? 'row' : 'column'}
                      wrap={isMinSize(size, 'medium')}
                      overflow={
                        isMaxSize(size, 'sm') ? 'hidden' : 'visible'
                      }
                      align="center"
                      fill="horizontal"
                    >
                      {scoresVDEM.map(right => {
                        const regionRight = regionScores.find(
                          r => r.key === right.key,
                        );
                        return (
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
                              scores={{
                                country: right.scores,
                                regions: regionRight.scores,
                              }}
                              maxYear={maxYearVDEM}
                              minYear={minYearVDEM}
                              maxValue={TYPES.vdem.max}
                              benchmark={benchmark}
                              metric={getMetricDetails(right.key)}
                              mode="multi-country"
                              onSelectMetric={() => onSelectMetric(right.key)}
                              onSelectPage={onSelectPage}
                              currentRegion={
                                country[COLUMNS.COUNTRIES.UN_REGION]
                              }
                              setHighlightYear={setYear}
                              highlightYear={highlightYear}
                            />
                          </WrapPlot>
                        );
                      })}
                    </Box>
                  )}
                </MultiCardWrapper>
              )}
              {hasVDEM && (
                <Source type="vdem" />
              )}
            </Section>
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
