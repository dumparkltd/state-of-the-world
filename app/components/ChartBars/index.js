import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';
import { injectIntl } from 'react-intl'; // not used now?

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
  return (
    <ResponsiveContext.Consumer>
      {() => (
        <Styled
          pad={{
            top: 'ms',
            bottom: 'medium',
          }}
          direction="column"
          fill="horizontal"
        >
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

export default injectIntl(ChartBars);
