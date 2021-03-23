import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl'; // not used now?
import styled from 'styled-components';
import { Box, ResponsiveContext, Text } from 'grommet';

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

function ChartBars({
  data,
  currentBenchmark,
  metric,
  bullet,
  maxValue,
  stripes = false,
  unit,
  sort,
  allowWordBreak = true,
  annotateMinMax = true,
  color,
}) {
  const scoresAside = true;
  if (!data) return null;
  // <Box
  // margin={{ bottom: 'small' }}
  // direction="row"
  // gap="small"
  // align="center"
  // >
  // <MetricIcon src={metric.iconInv} alt="" color={color} />
  // <Text size="large" weight={600}>
  // <FormattedMessage {...rootMessages.rights[metric.key]} />
  // </Text>
  // </Box>
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
          <Box pad={{ left: 'small' }} margin={{ bottom: 'small' }}>
            <Text size="large" weight={600}>
              <FormattedMessage {...rootMessages.rights[metric.key]} />
            </Text>
          </Box>
          <ListHeader
            metric={metric}
            benchmark={currentBenchmark && currentBenchmark.key}
            hasAside={scoresAside}
            annotateMinMax={annotateMinMax}
            sort={sort}
          />
          <WrapInnerChart>
            {data.map(d => (
              <BarWrapper
                key={d.key}
                score={d}
                bullet={bullet}
                allowWordBreak={allowWordBreak}
                maxValue={maxValue}
                unit={unit}
                stripes={stripes}
                color={color}
              />
            ))}
          </WrapInnerChart>
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
  unit: PropTypes.string,
  color: PropTypes.string,
};

export default ChartBars;
