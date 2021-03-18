/**
 *
 * ChartMetricTrend
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Box, Text } from 'grommet';

import { formatScore } from 'utils/scores';

import ButtonPlain from 'styled/ButtonPlain';
import rootMessages from 'messages';

const Styled = styled(p => <Box flex={{ shrink: false }} {...p} />)`
  width: 200px;
  padding-top: ${({ margin }) => margin.top || 0}px;
  padding-bottom: ${({ margin }) => margin.bottom || 0}px;
`;
const Inner = styled(p => <Box fill {...p} />)`
  position: relative;
`;
const CountryLabel = styled(Box)`
  position: absolute;
  left: 0;
  top: ${({ offsetY }) => offsetY}px;
  font-weight: bold;
  color: ${({ regionCode, theme }) => theme.global.colors[regionCode]};
  transform: translateY(-50%);
  margin-top: -1px;
`;
// color: ${({ region }) => }
const RegionButton = styled(p => <ButtonPlain {...p} />)`
  position: absolute;
  left: 0;
  top: ${({ offsetY }) => offsetY}px;
  transform: translateY(-50%);
  margin-top: -1px;
  display: block;
  width: 100%;
`;
const RegionLabel = styled(Box)`
  position: absolute;
  left: 0;
  top: ${({ offsetY }) => offsetY}px;
  font-weight: bold;
  font-weight: ${({ inactive }) => (inactive ? 'normal' : 'bold')};
  color: ${({ regionCode, inactive, theme }) =>
    inactive ? 'grey' : theme.global.colors[regionCode]};
  transform: translateY(-50%);
  margin-top: -1px;
`;
// background: yellow;
// border: 1px solid;

const prepRegions = (
  regionScores,
  column,
  year,
  height,
  maxLabelHeight,
  range,
  minValue,
  maxYear,
) =>
  regionScores &&
  Object.keys(regionScores)
    .map(regionCode => {
      const rScores = regionScores[regionCode][column];
      const yearScore = rScores[year];
      const maxYearScore = rScores[maxYear];
      return {
        value: yearScore ? yearScore.average : null,
        valueMaxYear: maxYearScore ? maxYearScore.average : null,
        count: yearScore ? yearScore.count : null,
        code: regionCode,
      };
    })
    .sort((a, b) => {
      if (!a || !b) return 1;
      return a.valueMaxYear > b.valueMaxYear ? -1 : 1;
    })
    .reduce((memo, region) => {
      const { valueMaxYear } = region;
      const minOffset =
        memo.length > 0 ? memo[memo.length - 1].offset + maxLabelHeight : 0;
      const offset = Math.max(
        minOffset,
        (1 - (valueMaxYear - minValue) / range) * height,
      );
      // console.log(valueMaxYear, minOffset, offset, valueMaxYear / maxValue)
      return [
        ...memo,
        {
          ...region,
          offset,
        },
      ];
    }, []);
const prepHiCountry = (
  regions,
  countriesScores,
  highlightCountry,
  column,
  year,
  height,
  maxLabelHeight,
  range,
  minValue,
  maxYear,
) => {
  const scores =
    highlightCountry &&
    countriesScores &&
    countriesScores[highlightCountry] &&
    countriesScores[highlightCountry][column];
  const value = scores && scores[year] && scores[year].score;
  let valueMaxYear;
  let offset;
  if (scores) {
    valueMaxYear = scores[maxYear]
      ? scores[maxYear].score
      : scores[Object.keys(scores)[Object.keys(scores).length - 1]].score;
    offset = (1 - (valueMaxYear - minValue) / range) * height;
    const regionOffset = regions && regions[0].offset;
    if (Math.abs(offset - regionOffset) < maxLabelHeight) {
      if (offset < regionOffset) {
        offset = regionOffset - maxLabelHeight;
      } else {
        offset = regionOffset + maxLabelHeight;
      }
    }
  }

  return {
    value,
    offset,
  };
};

const LABEL_RESERVED_HEIGHT = 12;

function ScoreSheet({
  height,
  margin,
  regionScores,
  countriesScores,
  year,
  highlightCountry,
  highlightRegion,
  column,
  intl,
  metric,
  maxValue,
  minValue,
  maxYear,
  onSetRegionFilter,
  unRegionFilterValue,
  setRegion,
}) {
  // const maxValue = metric.type === 'esr' ? 100 : 10;
  const styledHeight = margin
    ? height - (margin.top || 0) - (margin.bottom || 0)
    : height;

  const regions =
    regionScores &&
    prepRegions(
      regionScores,
      column,
      year,
      styledHeight,
      LABEL_RESERVED_HEIGHT,
      maxValue - minValue,
      minValue,
      maxYear,
    );
  const hiCountry =
    highlightCountry &&
    prepHiCountry(
      regions,
      countriesScores,
      highlightCountry,
      column,
      year,
      styledHeight,
      LABEL_RESERVED_HEIGHT,
      maxValue - minValue,
      minValue,
      maxYear,
    );
  /* eslint-disable no-console */
  if (hiCountry && !rootMessages.countries[highlightCountry]) {
    console.log('Country code not in language files:', highlightCountry);
  }
  /* eslint-enable no-console */
  const countryTitle =
    highlightCountry && rootMessages.countries[highlightCountry]
      ? intl.formatMessage(rootMessages.countries[highlightCountry])
      : highlightCountry;
  return (
    <Styled margin={margin}>
      <Inner>
        {regions &&
          regions.map(
            region =>
              region.value && (
                <RegionButton
                  key={region.code}
                  offsetY={region.offset}
                  onClick={() =>
                    unRegionFilterValue === 'all' &&
                    onSetRegionFilter(region.code)
                  }
                  onMouseOver={() =>
                    unRegionFilterValue === 'all' && setRegion(region.code)
                  }
                  onFocus={() =>
                    unRegionFilterValue === 'all' && setRegion(region.code)
                  }
                  onMouseOut={() =>
                    unRegionFilterValue === 'all' && setRegion(false)
                  }
                  onBlur={() =>
                    unRegionFilterValue === 'all' && setRegion(false)
                  }
                  disabled={unRegionFilterValue === 'world'}
                >
                  <RegionLabel
                    direction="row"
                    gap="xsmall"
                    inactive={
                      highlightRegion && region.code !== highlightRegion
                    }
                    regionCode={region.code}
                    align="center"
                  >
                    <Text size="xsmall">
                      {`${formatScore(region.value, 1, intl)}${
                        metric.type === 'esr' ? '%' : ''
                      }`}
                    </Text>
                    <Text size="xxsmall">
                      <FormattedMessage
                        {...rootMessages.un_regions_short[region.code]}
                      />
                    </Text>
                  </RegionLabel>
                </RegionButton>
              ),
          )}
        {hiCountry && (
          <CountryLabel
            direction="row"
            gap="xsmall"
            align="center"
            regionCode={
              regionScores &&
              Object.keys(regionScores) &&
              Object.keys(regionScores)[0]
            }
            offsetY={hiCountry.offset}
          >
            <Text size="xsmall">
              {hiCountry.value &&
                `${formatScore(hiCountry.value, 1, intl)}${
                  metric.type === 'esr' ? '%' : ''
                }`}
              {!hiCountry.value && 'N/A'}
            </Text>
            <Text size="xxsmall">{countryTitle}</Text>
          </CountryLabel>
        )}
      </Inner>
    </Styled>
  );
}

ScoreSheet.propTypes = {
  height: PropTypes.number,
  margin: PropTypes.object,
  regionScores: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countriesScores: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  year: PropTypes.string,
  highlightCountry: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  highlightRegion: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  column: PropTypes.string,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  maxYear: PropTypes.string,
  unRegionFilterValue: PropTypes.string,
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSetRegionFilter: PropTypes.func,
  setRegion: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(ScoreSheet);
