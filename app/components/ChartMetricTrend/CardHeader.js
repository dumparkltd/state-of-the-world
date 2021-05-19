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

import ChartNotes from 'components/ChartNotes';
import Tooltip from 'components/Tooltip';

import ButtonPlain from 'styled/ButtonPlain';

import rootMessages from 'messages';
import messages from './messages';

const Styled = styled.div`
  margin-bottom: 5px;
`;
const MetricIcon = styled.img`
  background: ${({ theme, color }) => theme.global.colors[color]};
  height: 48px;
  width: 48px;
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
  currentRegion,
  year,
  onSelectMetric,
  column,
  mode,
  intl,
}) {
  // console.log(mode)
  return (
    <Styled>
      <Box fill direction="row" justify="between" gap="small" align="start">
        <Box>
          <ButtonTitle color={currentRegion} onClick={() => onSelectMetric()}>
            <Box direction="row" gap="small" align="center">
              <MetricIcon src={metric.iconInv} alt="" color={currentRegion} />
              <Text size="large" weight={600} color={currentRegion}>
                {metric.type === 'esr' && (
                  <FormattedMessage {...rootMessages.rights[metric.key]} />
                )}
                {metric.type !== 'esr' && (
                  <FormattedMessage
                    {...rootMessages['rights-short'][metric.key]}
                  />
                )}
              </Text>
            </Box>
          </ButtonTitle>
        </Box>
        {mode === 'multi-region' && (
          <Box flex={{ shrink: 0 }}>
            <Box align="end" gap="xxsmall">
              <Text size="large" weight={700} color={currentRegion}>
                {getRegionYearScore(
                  year,
                  regionScores[currentRegion][column],
                  metric.type,
                  intl,
                )}
              </Text>
              <Box direction="row" gap="xxsmall">
                <Text size="xxsmall">
                  {currentRegion === 'world' && (
                    <FormattedMessage
                      {...rootMessages.labels.worldScore}
                      values={{ year }}
                    />
                  )}
                  {currentRegion !== 'world' && (
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
                      <Text size="xsmall" weight={600}>
                        {metric.type === 'esr' && (
                          <FormattedMessage {...messages.infoESRintro} />
                        )}
                        {metric.type === 'cpr' && (
                          <FormattedMessage {...messages.infoCPRintro} />
                        )}
                        {metric.type === 'vdem' && (
                          <FormattedMessage {...messages.infoVDEMintro} />
                        )}
                      </Text>
                      <Text size="xsmall">
                        {metric.type === 'esr' && (
                          <FormattedMessage {...messages.infoESRadditional} />
                        )}
                        {metric.type === 'cpr' && (
                          <FormattedMessage {...messages.infoCPRadditional} />
                        )}
                        {metric.type === 'vdem' && (
                          <FormattedMessage {...messages.infoVDEMadditional} />
                        )}
                      </Text>
                      <ChartNotes
                        notes={{
                          gradesESR: metric.type === 'esr',
                          gradesCPR: metric.type === 'cpr',
                        }}
                      />
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
  currentRegion: PropTypes.string,
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
