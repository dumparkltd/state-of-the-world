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
import Tooltip from 'components/Tooltip';
import ButtonPlain from 'styled/ButtonPlain';
import rootMessages from 'messages';
import messages from './messages';

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
      <Box fill direction="row" justify="between" gap="small" align="start">
        <Box>
          <ButtonTitle
            color={unRegionFilterValue}
            onClick={() => onSelectMetric()}
          >
            <Text size="large" weight={600} color={unRegionFilterValue}>
              <FormattedMessage {...rootMessages['rights-short'][metric.key]} />
            </Text>
          </ButtonTitle>
        </Box>
        {mode === 'multi-region' && (
          <Box flex={{ shrink: 0 }}>
            <Box align="end" gap="xxsmall">
              <Text size="large" weight={700} color={unRegionFilterValue}>
                {getRegionYearScore(
                  year,
                  regionScores[unRegionFilterValue][column],
                  metric.type,
                  intl,
                )}
              </Text>
              <Box direction="row" gap="xxsmall">
                <Text size="xxsmall">
                  {unRegionFilterValue === 'world' && (
                    <FormattedMessage
                      {...rootMessages.labels.worldScore}
                      values={{ year }}
                    />
                  )}
                  {unRegionFilterValue !== 'world' && (
                    <FormattedMessage
                      {...rootMessages.labels.regionScore}
                      values={{ year }}
                    />
                  )}
                </Text>
                <Tooltip
                  large
                  margin={{}}
                  iconSize="small"
                  component={
                    <Box gap="small">
                      <Text size="xsmall">
                        {metric.type === 'esr' && (
                          <FormattedMessage {...messages.infoESRintro} />
                        )}
                        {metric.type === 'cpr' && (
                          <FormattedMessage {...messages.infoCPRintro} />
                        )}
                      </Text>
                      <Text size="xsmall">
                        {metric.type === 'esr' && (
                          <FormattedMessage {...messages.infoESRadditional} />
                        )}
                        {metric.type === 'cpr' && (
                          <FormattedMessage {...messages.infoCPRadditional} />
                        )}
                      </Text>
                    </Box>
                  }
                />
              </Box>
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
