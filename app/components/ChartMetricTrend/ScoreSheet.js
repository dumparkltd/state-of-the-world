/**
 *
 * ChartMetricTrend
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { formatScore } from 'utils/scores';

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

function ScoreSheet({
  height,
  margin,
  regionScores,
  countriesScores,
  year,
  highlightCountry,
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
                  <div key={region.code}>
                    {`${region.code}: ${formatScore(region.value, 1, intl)}${
                      metric.type === 'esr' ? ' %' : ''
                    } (${region.count})`}
                  </div>
                ),
            )}
      </div>
      {hiCountry && (
        <div>
          {`${countryTitle}: ${formatScore(hiCountry.score, 1, intl)}${
            metric.type === 'esr' ? ' %' : ''
          }`}
        </div>
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
  column: PropTypes.string,
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
};

export default injectIntl(ScoreSheet);
