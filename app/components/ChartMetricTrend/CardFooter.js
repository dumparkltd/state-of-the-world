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
  unRegionFilterValue,
  year,
  column,
  regionTotals,
  isESR,
  onSelectMetric,
  onSelectPage,
  mode,
}) {
  const notes = {
    regionAvg: mode === 'multi-region' || mode === 'detail-region',
    regionInterval:
      (mode === 'multi-region' || mode === 'detail-region') &&
      unRegionFilterValue &&
      regionScores &&
      regionScores[unRegionFilterValue] &&
      regionScores[unRegionFilterValue][column] &&
      Object.keys(regionScores[unRegionFilterValue][column]) &&
      Object.keys(regionScores[unRegionFilterValue][column]).length > 0 &&
      !isESR,
    countryInterval:
      mode === 'multi-country' &&
      countryScores &&
      countryScores[column] &&
      Object.keys(countryScores[column]) &&
      Object.keys(countryScores[column]).length > 0 &&
      !isESR,
    countryRegionAvg:
      mode === 'multi-country' &&
      regionScores &&
      regionScores[unRegionFilterValue] &&
      regionScores[unRegionFilterValue][column] &&
      Object.keys(regionScores[unRegionFilterValue][column]) &&
      Object.keys(regionScores[unRegionFilterValue][column]).length > 0,
  };
  // console.log(notes)
  let total;
  let count;
  let valuesAvg;
  let valuesInterval;
  if (notes.regionAvg && regionScores && regionTotals) {
    total = regionTotals[unRegionFilterValue];
    count =
      unRegionFilterValue &&
      unRegionFilterValue !== 'all' &&
      getRegionYearCount(year, regionScores[unRegionFilterValue][column]);
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
  if (notes.regionInterval) {
    // prettier-ignore
    valuesInterval = {
      link: (
        <ButtonText onClick={() => onSelectPage('methodology')}>
          <FormattedMessage
            {...messages.noteCredibleIntervalLinkRegions}
            values={{ count, total }}
          />
        </ButtonText>
      ),
    };
  }
  if (notes.countryInterval) {
    // prettier-ignore
    valuesInterval = {
      link: (
        <ButtonText onClick={() => onSelectPage('methodology')}>
          <FormattedMessage
            {...messages.noteCredibleIntervalLinkCountry}
            values={{ count, total }}
          />
        </ButtonText>
      ),
    };
  }
  return (
    <Styled>
      {notes.regionAvg && (
        <>
          {(!unRegionFilterValue || unRegionFilterValue === 'all') && (
            <Hint>
              <Text size="xxsmall">
                <FormattedMessage {...messages.noteAssessmentMultiple} />
              </Text>
            </Hint>
          )}
          {unRegionFilterValue && (
            <Hint>
              {count > 0 && count < total && (
                <Text size="xxsmall">
                  <FormattedMessage
                    {...messages.noteAssessmentRatio}
                    values={valuesAvg}
                  />
                </Text>
              )}
              {count === 0 && (
                <Text size="xxsmall">
                  {unRegionFilterValue === 'world' && (
                    <FormattedMessage
                      {...messages.noteAssessmentNoneWorld}
                      values={{ year }}
                    />
                  )}
                  {unRegionFilterValue !== 'world' && !isESR && (
                    <FormattedMessage
                      {...messages.noteAssessmentNoneRegion}
                      values={{ year }}
                    />
                  )}
                  {unRegionFilterValue !== 'world' && isESR && (
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
      {(notes.regionInterval || notes.countryInterval) && (
        <Box direction="row" gap="xsmall" align="center">
          <RangeWrapper>
            <Range region={unRegionFilterValue} />
            <Mean region={unRegionFilterValue} />
          </RangeWrapper>
          <Hint>
            <Text size="xxsmall">
              {notes.regionInterval && (
                <FormattedMessage
                  {...messages.noteCredibleIntervalRegions}
                  values={valuesInterval}
                />
              )}
              {notes.countryInterval && (
                <FormattedMessage
                  {...messages.noteCredibleIntervalCountry}
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
                      {...rootMessages.un_regions_short[unRegionFilterValue]}
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
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  column: PropTypes.string,
  countryScores: PropTypes.object,
  regionScores: PropTypes.object,
  regionTotals: PropTypes.object,
  mode: PropTypes.string,
  year: PropTypes.string,
  isESR: PropTypes.bool,
  onSelectMetric: PropTypes.func,
  onSelectPage: PropTypes.func,
};

export default CardFooter;
