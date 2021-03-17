/**
 *
 * ChartMetricTrend
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { formatScore } from 'utils/scores';
import { Box, Text } from 'grommet';
import rootMessages from 'messages';

const Styled = styled.div`
  display: block;
  height: ${({ height, margin }) => {
    if (margin) {
      return height - (margin.top || 0) - (margin.bottom || 0);
    }
    return height;
  }}px;
  position: absolute;
  right: 0;
  top: ${({ margin }) => margin.top || 0}px;
  width: 200px;
`;
const CountryLabel = styled(Box)`
  font-weight: bold;
  color: ${({ regionCode, theme }) => theme.global.colors[regionCode]};
`;
// color: ${({ region }) => }
const RegionLabel = styled(Box)`
  font-weight: bold;
  font-weight: ${({ inactive }) => (inactive ? 'normal' : 'bold')};
  color: ${({ regionCode, inactive, theme }) =>
    inactive ? 'grey' : theme.global.colors[regionCode]};
`;
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
}) {
  const hiCountry =
    highlightCountry &&
    countriesScores &&
    countriesScores[highlightCountry] &&
    countriesScores[highlightCountry][column] &&
    countriesScores[highlightCountry][column][year];
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
    <Styled height={height} margin={margin}>
      <div>
        <strong>{year}</strong>
      </div>
      <div>
        {regionScores &&
          Object.keys(regionScores)
            .map(regionCode => {
              const rScores = regionScores[regionCode][column];
              const yearScore = rScores[year];
              return {
                value: yearScore ? yearScore.average : null,
                count: yearScore ? yearScore.count : null,
                code: regionCode,
              };
            })
            .sort((a, b) => {
              if (!a || !b) return 1;
              return a.value > b.value ? -1 : 1;
            })
            .map(
              region =>
                region.value && (
                  <RegionLabel
                    key={region.code}
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
                        {...rootMessages.un_regions[region.code]}
                      />
                    </Text>
                  </RegionLabel>
                ),
            )}
      </div>
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
        >
          <Text size="xsmall">
            {`${formatScore(hiCountry.score, 1, intl)}${
              metric.type === 'esr' ? '%' : ''
            }`}
          </Text>
          <Text size="xxsmall">{countryTitle}</Text>
        </CountryLabel>
      )}
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
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
};

export default injectIntl(ScoreSheet);
