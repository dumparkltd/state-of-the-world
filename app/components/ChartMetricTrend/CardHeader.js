/**
 *
 * ChartMetricTrend
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Text, Box } from 'grommet';

import { getRegionYearScore } from 'utils/charts';

import rootMessages from 'messages';
import ButtonPlain from 'styled/ButtonPlain';

const Styled = styled.div`
  margin-bottom: 5px;
`;

const ButtonTitle = styled(ButtonPlain)`
  color: ${({ color, theme }) => theme.global.colors[color]};
  &:hover {
    color: ${({ color, theme }) => theme.global.colors[color]};
    text-decoration: underline;
  }
`;

function CardHeader({
  metric,
  regionScores,
  unRegionFilterValue,
  year,
  onSelectMetric,
  column,
  mode,
  intl,
}) {
  // console.log(metric, regionScores, regionTotals, unRegionFilterValue)
  return (
    <Styled>
      <Box fill direction="row" justify="between" gap="small" align="center">
        <Box>
          <ButtonTitle
            color={unRegionFilterValue}
            onClick={() => onSelectMetric()}
          >
            <Text weight={600} color={unRegionFilterValue}>
              <FormattedMessage {...rootMessages['rights-short'][metric.key]} />
            </Text>
          </ButtonTitle>
        </Box>
        {mode === 'multi' && (
          <Box flex={{ shrink: 0 }}>
            <Box direction="row" gap="xsmall" justify="between">
              <Text size="small">
                <FormattedMessage {...rootMessages.labels.regionScore} />
              </Text>
              <Text size="small" weight={600} color={unRegionFilterValue}>
                {getRegionYearScore(
                  year,
                  regionScores[unRegionFilterValue][column],
                  metric.type,
                  intl,
                )}
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    </Styled>
  );
}

CardHeader.propTypes = {
  unRegionFilterValue: PropTypes.string,
  column: PropTypes.string,
  regionScores: PropTypes.object,
  year: PropTypes.string,
  mode: PropTypes.string,
  onSelectMetric: PropTypes.func,
  highlightCountry: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
};

export default injectIntl(CardHeader);
