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

function CardHeader({ metric, currentRegion, onSelectMetric, mode }) {
  return (
    <Styled>
      <Box direction="row" gap="small" align="center" fill="horizontal">
        <MetricIcon src={metric.iconInv} alt="" color={currentRegion} />
        <Box gap="xxsmall" fill>
          {mode === 'multi-region' && (
            <Box
              fill
              direction="row"
              justify="between"
              gap="small"
              align="start"
            >
              <Text size="xxsmall" color={currentRegion}>
                <FormattedMessage {...rootMessages.un_regions[currentRegion]} />
              </Text>
              <Box direction="row" gap="xxsmall">
                <Text size="xxsmall" color="secondary">
                  {currentRegion === 'world' && (
                    <FormattedMessage {...rootMessages.labels.worldScore} />
                  )}
                  {currentRegion !== 'world' && (
                    <FormattedMessage {...rootMessages.labels.regionScore} />
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
          )}
          <Box fill direction="row" justify="between" gap="small" align="start">
            <ButtonTitle
              color={currentRegion}
              onClick={() => onSelectMetric('regions')}
            >
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
            </ButtonTitle>
          </Box>
        </Box>
      </Box>
    </Styled>
  );
}

CardHeader.propTypes = {
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  currentRegion: PropTypes.string,
  onSelectMetric: PropTypes.func,
  mode: PropTypes.string,
};

export default CardHeader;
