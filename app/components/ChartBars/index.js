import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl'; // not used now?
import styled from 'styled-components';
import { Box, ResponsiveContext, Text } from 'grommet';

import LoadingIndicator from 'components/LoadingIndicator';
import Hint from 'styled/Hint';

import rootMessages from 'messages';

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
      {() => (
        <Styled
          pad={{
            top: 'ms',
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
            margin={{ bottom: 'small' }}
            direction="row"
            gap="small"
            align="center"
          >
            <MetricIcon src={metric.iconInv} alt="" bgr={color} />
            <Text size="large" weight={600} color={color}>
              <FormattedMessage {...rootMessages.rights[metric.key]} />
            </Text>
          </Box>
          {!dataReady && <LoadingIndicator />}
          {!hasResults && dataReady && (
            <Hint italic>
              <FormattedMessage {...rootMessages.hints.noResults} />
            </Hint>
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
