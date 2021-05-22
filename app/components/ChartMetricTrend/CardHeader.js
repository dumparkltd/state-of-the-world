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
  background: ${({ theme, bgr }) => theme.global.colors[bgr]};
  height: ${({ small }) => (small ? 40 : 48)}px;
  width: ${({ small }) => (small ? 40 : 48)}px;
`;

const ButtonTitle = styled(ButtonPlain)`
  color: ${({ color, theme }) => theme.global.colors[color]};
  line-height: normal;
  &:hover {
    color: ${({ color, theme }) => theme.global.colors[color]};
    text-decoration: underline;
  }
`;

// {mode === 'detail-region' && (
//   <Box margin={{ vertical: 'small' }}>
//     <Text size="large" weight={700}>
//       <FormattedMessage
//         {...rootMessages.rights[metric.key]}
//       />
//     </Text>
//   </Box>
// )}

function CardHeader({ metric, currentRegion, onSelectMetric, mode }) {
  const color = currentRegion === 'all' ? 'world' : currentRegion || 'world';
  // prettier-ignore
  return (
    <Styled>
      <Box direction="row" gap="small" align="center" fill="horizontal">
        <MetricIcon
          src={metric.iconInv}
          alt=""
          bgr={color}
          small={mode === 'multi-country'}
        />
        <Box gap="xxsmall" fill>
          {mode === 'multi-region' && (
            <Box
              fill
              direction="row"
              justify="between"
              gap="small"
              align="start"
            >
              <Text size="xxsmall" color={color}>
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
                        <FormattedMessage {...messages.infoIntro} />
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
          <Box
            direction="row"
            justify="between"
            gap="small"
            align="center"
          >
            {(mode === 'multi-region' || mode === 'multi-country') && (
              <ButtonTitle
                color={currentRegion}
                onClick={() => onSelectMetric('regions')}
              >
                <Text
                  size={mode === 'multi-country' ? 'medium' : 'large'}
                  weight={600}
                  color={currentRegion}
                >
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
            )}
            {mode === 'detail-region' && (
              <Box>
                <Text size="large" weight={600} color={color}>
                  <FormattedMessage {...rootMessages.rights[metric.key]} />
                </Text>
              </Box>
            )}
            {(mode === 'detail-region' || mode === 'multi-country') && (
              <Box direction="row" gap="xxsmall" align="center">
                {mode === 'detail-region' && (
                  <Text size="xxsmall" color="secondary">
                    {currentRegion === 'world' && (
                      <FormattedMessage
                        {...rootMessages.labels.worldDetailScore}
                      />
                    )}
                    {currentRegion === 'all' && (
                      <FormattedMessage {...rootMessages.labels.allDetailScore} />
                    )}
                    {currentRegion !== 'world' && currentRegion !== 'all' && (
                      <FormattedMessage
                        {...rootMessages.labels.regionDetailScore}
                      />
                    )}
                  </Text>
                )}
                <Tooltip
                  large
                  margin={{}}
                  iconSize="small"
                  component={
                    <Box gap="small">
                      {mode === 'detail-region' && (
                        <Text size="xsmall">
                          {currentRegion === 'all' && (
                            <FormattedMessage {...messages.infoIntroAll} />
                          )}
                          {currentRegion === 'world' && (
                            <FormattedMessage {...messages.infoIntroWorld} />
                          )}
                          {currentRegion !== 'world' &&
                            currentRegion !== 'all' && (
                            <FormattedMessage {...messages.infoIntro} />
                          )}
                        </Text>
                      )}
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
            )}
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
