/**
 *
 * ChartMetricTrend
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Text, Box } from 'grommet';

import { getRegionYearCount } from 'utils/charts';

import ButtonText from 'styled/ButtonText';

import Hint from 'styled/Hint';

import rootMessages from 'messages';
import messages from './messages';

const Styled = styled.div`
  margin-top: 5px;
`;

const RangeWrapper = styled(Box)`
  position: relative;
  display: block;
  width: 20px;
  height: 12px;
`;
const Range = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 20px;
  height: 12px;
  background-color: ${({ theme, region }) => theme.global.colors[region]};
  opacity: 0.2;
`;

const Mean = styled.div`
  display: block;
  height: 1px;
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  border-top: 2px solid;
  border-color: ${({ theme, region }) => theme.global.colors[region]};
`;
const MeanRegion = styled.div`
  display: block;
  height: 2px;
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  background-image: url("data:image/svg+xml, %3Csvg width='20' height='2' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Cline stroke='black' strokeWidth='3' stroke-dasharray='2, 5' x1='0' y1='1' x2='20' y2='1'%3E%3C/line%3E%3C/svg%3E");
`;

function CardFooter({
  regionScores,
  countryScores,
  currentRegion,
  year,
  column,
  regionTotals,
  onSelectMetric,
  onSelectPage,
  mode,
  type,
}) {
  const notes = {
    regionBias:
      type === 'esr' && mode === 'detail-region' && currentRegion === 'all',
    regionAvg: mode === 'multi-region' || mode === 'detail-region',
    regionIntervalCPR:
      (mode === 'multi-region' || mode === 'detail-region') &&
      currentRegion &&
      regionScores &&
      regionScores[currentRegion] &&
      regionScores[currentRegion][column] &&
      Object.keys(regionScores[currentRegion][column]) &&
      Object.keys(regionScores[currentRegion][column]).length > 0 &&
      type === 'cpr',
    countryIntervalCPR:
      mode === 'multi-country' &&
      countryScores &&
      countryScores[column] &&
      Object.keys(countryScores[column]) &&
      Object.keys(countryScores[column]).length > 0 &&
      type === 'cpr',
    regionIntervalVDEM:
      (mode === 'multi-region' || mode === 'detail-region') &&
      currentRegion &&
      regionScores &&
      regionScores[currentRegion] &&
      regionScores[currentRegion][column] &&
      Object.keys(regionScores[currentRegion][column]) &&
      Object.keys(regionScores[currentRegion][column]).length > 0 &&
      type === 'vdem',
    countryIntervalVDEM:
      mode === 'multi-country' &&
      countryScores &&
      countryScores[column] &&
      Object.keys(countryScores[column]) &&
      Object.keys(countryScores[column]).length > 0 &&
      type === 'vdem',
    countryRegionAvg:
      mode === 'multi-country' &&
      regionScores &&
      regionScores[currentRegion] &&
      regionScores[currentRegion][column] &&
      Object.keys(regionScores[currentRegion][column]) &&
      Object.keys(regionScores[currentRegion][column]).length > 0,
  };
  // console.log(notes)
  let total;
  let count;
  let valuesAvg;
  let valuesInterval;
  if (notes.regionAvg && regionScores && regionTotals) {
    total = regionTotals[currentRegion];
    count =
      currentRegion &&
      currentRegion !== 'all' &&
      getRegionYearCount(year, regionScores[currentRegion][column]);
    // prettier-ignore
    valuesAvg = {
      year: <strong>{year}</strong>,
      link: (
        <ButtonText onClick={() => onSelectMetric('ranking', year)}>
          <FormattedMessage
            {...messages.noteRatioLink}
            values={{ count, total }}
          />
        </ButtonText>
      ),
    };
  }
  if (notes.countryIntervalCPR) {
    // prettier-ignore
    valuesInterval = {
      link: (
        <ButtonText onClick={() => onSelectPage('methodology-cpr')}>
          <FormattedMessage
            {...messages.noteCredibleIntervalLinkCountry}
          />
        </ButtonText>
      ),
    };
  }
  if (notes.regionIntervalCPR) {
    // prettier-ignore
    valuesInterval = {
      link: (
        <ButtonText onClick={() => onSelectPage('methodology-cpr')}>
          <FormattedMessage
            {...messages.noteCredibleIntervalLinkRegions}
          />
        </ButtonText>
      ),
    };
  }
  if (notes.countryIntervalVDEM) {
    // prettier-ignore
    valuesInterval = {
      link: (
        <ButtonText onClick={() => onSelectPage('methodology-vdem')}>
          <FormattedMessage
            {...messages.noteCredibleIntervalLinkCountry}
          />
        </ButtonText>
      ),
    };
  }
  if (notes.regionIntervalVDEM) {
    // prettier-ignore
    valuesInterval = {
      link: (
        <ButtonText onClick={() => onSelectPage('methodology-vdem')}>
          <FormattedMessage
            {...messages.noteCredibleIntervalLinkRegions}
          />
        </ButtonText>
      ),
    };
  }
  return (
    <Styled>
      {notes.regionBias && (
        <Hint>
          <Text size="xxsmall">
            <FormattedMessage
              {...rootMessages.charts.noteRegionalBiasESRWithLink}
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
        </Hint>
      )}
      {notes.regionAvg && (
        <>
          {(!currentRegion || currentRegion === 'all') && (
            <Hint>
              <Text size="xxsmall">
                <FormattedMessage {...messages.noteAssessmentMultiple} />
              </Text>
            </Hint>
          )}
          {currentRegion && (
            <Hint>
              {count > 0 && count < total && (
                <Text size="xxsmall">
                  <FormattedMessage
                    {...messages.noteAssessmentRatio}
                    values={valuesAvg}
                  />
                </Text>
              )}
              {count > 0 && count === total && (
                <Text size="xxsmall">
                  <FormattedMessage
                    {...messages.noteAssessmentRatioAll}
                    values={valuesAvg}
                  />
                </Text>
              )}
              {count === 0 && (
                <Text size="xxsmall">
                  {currentRegion === 'world' && (
                    <FormattedMessage
                      {...messages.noteAssessmentNoneWorld}
                      values={{ year }}
                    />
                  )}
                  {currentRegion !== 'world' && type === 'cpr' && (
                    <FormattedMessage
                      {...messages.noteAssessmentNoneRegion}
                      values={{ year }}
                    />
                  )}
                  {currentRegion !== 'world' && type === 'esr' && (
                    <FormattedMessage
                      {...messages.noteAssessmentNoneRegionESR}
                      values={{ year }}
                    />
                  )}
                </Text>
              )}
            </Hint>
          )}
        </>
      )}
      {(notes.regionIntervalCPR || notes.countryIntervalCPR) && (
        <Box direction="row" gap="xsmall" align="center">
          <RangeWrapper>
            <Range region={currentRegion} />
            <Mean region={currentRegion} />
          </RangeWrapper>
          <Hint>
            <Text size="xxsmall">
              {notes.regionIntervalCPR && (
                <FormattedMessage
                  {...messages.noteCredibleIntervalRegions}
                  values={valuesInterval}
                />
              )}
              {notes.countryIntervalCPR && (
                <FormattedMessage
                  {...messages.noteCredibleIntervalCountry}
                  values={valuesInterval}
                />
              )}
            </Text>
          </Hint>
        </Box>
      )}
      {(notes.regionIntervalVDEM || notes.countryIntervalVDEM) && (
        <Box direction="row" gap="xsmall" align="center">
          <RangeWrapper>
            <Range region={currentRegion} />
            <Mean region={currentRegion} />
          </RangeWrapper>
          <Hint>
            <Text size="xxsmall">
              {notes.regionIntervalVDEM && (
                <FormattedMessage
                  {...messages.noteCredibleIntervalRegionsVDEM}
                  values={valuesInterval}
                />
              )}
              {notes.countryIntervalVDEM && (
                <FormattedMessage
                  {...messages.noteCredibleIntervalCountryVDEM}
                  values={valuesInterval}
                />
              )}
            </Text>
          </Hint>
        </Box>
      )}
      {notes.countryRegionAvg && (
        <Box direction="row" gap="xsmall" align="center">
          <RangeWrapper>
            <MeanRegion />
          </RangeWrapper>
          <Hint>
            <Text size="xxsmall">
              <FormattedMessage
                {...messages.noteUNRegionAverage}
                values={{
                  group: (
                    <FormattedMessage
                      {...rootMessages.un_regions_short[currentRegion]}
                    />
                  ),
                }}
              />
            </Text>
          </Hint>
        </Box>
      )}
    </Styled>
  );
}

CardFooter.propTypes = {
  currentRegion: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  column: PropTypes.string,
  countryScores: PropTypes.object,
  regionScores: PropTypes.object,
  regionTotals: PropTypes.object,
  mode: PropTypes.string,
  year: PropTypes.string,
  type: PropTypes.string,
  onSelectMetric: PropTypes.func,
  onSelectPage: PropTypes.func,
};

export default CardFooter;
