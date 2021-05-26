import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl'; // not used now?
import styled from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';

import Tooltip from 'components/Tooltip';
import ChartNotes from 'components/ChartNotes';
import LoadingIndicator from 'components/LoadingIndicator';
import Hint from 'styled/Hint';
import { isMaxSize } from 'utils/responsive';

import rootMessages from 'messages';
import messages from './messages';

import BarWrapper from './BarWrapper';
import ListHeader from './ListHeader';

const Styled = styled(Box)`
  margin: 0 auto;
  position: relative;
`;
const WrapInnerChart = styled(Box)`
  position: relative;
`;

const MetricIcon = styled.img`
  background: ${({ theme, bgr }) => theme.global.colors[bgr]};
  height: ${({ small }) => (small ? 40 : 48)}px;
  width: ${({ small }) => (small ? 40 : 48)}px;
`;

function ChartBars({
  data,
  currentBenchmark,
  metric,
  sort,
  allowWordBreak = true,
  annotateMinMax = true,
  color,
  dataReady,
}) {
  const scoresAside = true;
  const hasResults = dataReady && (data && data.length > 0);

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled
          pad={{
            top: 'small',
            bottom: 'medium',
            left: 'small',
            right: 'medium',
          }}
          direction="column"
          fill="horizontal"
          elevation="small"
          background="white"
        >
          <Box
            direction="row"
            gap="xxsmall"
            margin={{ bottom: 'small' }}
            align="center"
            fill="horizontal"
          >
            <MetricIcon src={metric.iconInv} alt="" bgr={color} />
            <Box gap="xxsmall" fill="horizontal">
              <Box
                fill
                direction="row"
                justify="between"
                gap="small"
                align="start"
              >
                <Text size="xxsmall" color={color}>
                  <FormattedMessage {...rootMessages.un_regions[color]} />
                </Text>
                {isMaxSize(size, 'medium') && (
                  <Box direction="row" gap="xsmall">
                    <Tooltip
                      component={
                        <Box gap="small">
                          <Text size="xsmall">
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
                              <FormattedMessage
                                {...messages.infoESRadditional}
                              />
                            )}
                            {metric.type === 'cpr' && (
                              <FormattedMessage
                                {...messages.infoCPRadditional}
                              />
                            )}
                            {metric.type === 'vdem' && (
                              <FormattedMessage
                                {...messages.infoVDEMadditional}
                              />
                            )}
                          </Text>
                          <ChartNotes
                            notes={{
                              gradesESR: metric.type === 'esr',
                              gradesCPR: metric.type === 'cpr',
                              gradesVDEM: metric.type === 'vdem',
                            }}
                          />
                        </Box>
                      }
                    />
                  </Box>
                )}
              </Box>
              <Box>
                <Text size="large" weight={600} color={color}>
                  <FormattedMessage {...rootMessages.rights[metric.key]} />
                </Text>
              </Box>
            </Box>
          </Box>
          {!dataReady && <LoadingIndicator />}
          {!hasResults && dataReady && (
            <Box
              margin={{ left: 'large', vertical: 'medium', right: 'small' }}
              align="left"
            >
              <Hint italic>
                <FormattedMessage {...rootMessages.hints.noResults} />
              </Hint>
            </Box>
          )}
          {hasResults && dataReady && (
            <ListHeader
              metric={metric}
              benchmark={currentBenchmark && currentBenchmark.key}
              hasAside={scoresAside}
              annotateMinMax={annotateMinMax}
              sort={sort}
            />
          )}
          {hasResults && dataReady && (
            <WrapInnerChart>
              {data.map(d => (
                <BarWrapper
                  key={d.key}
                  score={d}
                  allowWordBreak={allowWordBreak}
                  type={metric.type}
                  color={color}
                />
              ))}
            </WrapInnerChart>
          )}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}
// metric={metric}
// standard={standard}
// currentBenchmark={currentBenchmark}

ChartBars.propTypes = {
  allowWordBreak: PropTypes.bool,
  bullet: PropTypes.bool,
  metric: PropTypes.object,
  sort: PropTypes.object,
  currentBenchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  annotateMinMax: PropTypes.bool,
  maxValue: PropTypes.number,
  stripes: PropTypes.bool,
  dataReady: PropTypes.bool,
  unit: PropTypes.string,
  color: PropTypes.string,
};

export default ChartBars;
