/**
 *
 * ChartRegionMetricTrend
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  LineMarkSeries,
  AreaSeries,
  HorizontalGridLines,
  Hint,
} from 'react-vis';
import { utcFormat as timeFormat } from 'd3-time-format';
import { formatScore } from 'utils/scores';
import { isMaxSize, isMinSize } from 'utils/responsive';

import WrapPlot from 'styled/WrapPlot';

import rootMessages from 'messages';

const PlotHint = styled.div`
  color: ${({ color, theme }) => theme.global.colors[color]};
  background: ${({ theme }) => theme.global.colors.white};
  padding: 5px 10px;
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme.global.edgeSize.xxsmall};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  width: auto;
  white-space: nowrap;
`;

const PlotHintTighter = styled(PlotHint)`
  padding: 3px 6px;
  margin-bottom: 5px;
  font-size: 14px;
`;

const isEven = n => n % 2 === 0;
const isOdd = n => Math.abs(n % 2) === 1;

const getTickValuesX = (size, minYear, maxYear) => {
  const tickValuesX = [];
  const noYears = maxYear + 1 - minYear;
  /* eslint-disable no-plusplus */
  for (let y = minYear; y <= maxYear; y++) {
    if (isMaxSize(size, 'sm') && noYears > 8) {
      if (isEven(noYears) && isOdd(y)) {
        tickValuesX.push(new Date(`${y}`).getTime());
      }
      if (isOdd(noYears) && isEven(y)) {
        tickValuesX.push(new Date(`${y}`).getTime());
      }
    } else {
      tickValuesX.push(new Date(`${y}`).getTime());
    }
  }
  /* eslint-enable no-plusplus */
  return tickValuesX;
};

const getRegionData = (region, scores, metricType, benchmarkKey, intl) => {
  if (!region) return [];
  const regionScores = scores[region];
  const columnScores =
    metricType === 'cpr' ? regionScores.mean : regionScores[benchmarkKey];
  return Object.keys(columnScores).reduce(
    (memo, year) => [
      ...memo,
      {
        syear: year,
        x: new Date(`${year}`).getTime(),
        y: parseFloat(columnScores[year].average),
        label: {
          year,
          scores: Object.keys(scores)
            .sort((a, b) => {
              if (!a || !b) return 1;
              const aScores = scores[a];
              const bScores = scores[b];
              const acScores =
                metricType === 'cpr' ? aScores.mean : aScores[benchmarkKey];
              const bcScores =
                metricType === 'cpr' ? bScores.mean : bScores[benchmarkKey];
              if (!acScores[year] || !bcScores[year]) return 1;
              return acScores[year].average > bcScores[year].average ? -1 : 1;
            })
            .reduce((m, r) => {
              const rScores = scores[r];
              const cScores =
                metricType === 'cpr' ? rScores.mean : rScores[benchmarkKey];
              if (!r || !cScores[year]) {
                return m;
              }
              return [
                ...m,
                {
                  region: r,
                  score: `${formatScore(cScores[year].average, 1, intl)}${
                    metricType === 'esr' ? ' %' : ''
                  }`,
                  count: cScores[year].count,
                },
              ];
            }, []),
        },
      },
    ],
    [],
  );
};

const colors = {
  all: 'black',
  AG: 'red',
  APG: 'blue',
  EEG: 'green',
  GRULAC: 'orange',
  WEOG: 'purple',
};
const getRegionColor = region => colors[region];

function ChartRegionMetricTrend({
  scores,
  maxYear,
  minYear,
  maxValue,
  benchmark,
  metric,
  // theme,
  intl,
}) {
  const [highlight, setHighlight] = useState(false);
  if (!maxYear) return null;

  // const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);

  // dummy data to force the area plot from 0
  // with some horizontal padding, hard-coded
  const dataForceYRange = [
    { x: new Date(minYear).getTime() - 15000000000, y: 0 },
    { x: new Date(maxYear).getTime() + 15000000000, y: maxValue },
  ];
  const isESR = metric.type === 'esr';
  const tickValuesY = isESR ? [0, 20, 40, 60, 80, 100] : [0, 2, 4, 6, 8, 10];
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box direction="row" align="center" pad={{ vertical: 'medium' }}>
          <Box flex={{ shrink: 0 }}>
            {Object.keys(colors).map(region => (
              <Box direction="row" gap="small" align="center" key={region}>
                <div
                  style={{
                    background: colors[region],
                    width: '10px',
                    height: '10px',
                    display: 'block',
                    borderRadius: '999px',
                  }}
                />
                <div>
                  <Text size="xsmall">
                    {`${intl.formatMessage(
                      rootMessages.un_regions[region],
                    )} (${region})`}
                  </Text>
                </div>
              </Box>
            ))}
          </Box>
          <WrapPlot metricType={metric.type}>
            <FlexibleWidthXYPlot
              height={isMinSize(size, 'medium') ? 240 : 200}
              xType="time"
              margin={{ bottom: 30, right: 10, left: isESR ? 30 : 25 }}
              onMouseLeave={() => setHighlight(false)}
            >
              <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
              <HorizontalGridLines
                tickValues={tickValuesY}
                style={{
                  stroke: 'rgba(136, 150, 160, 0.2)',
                }}
              />
              <XAxis
                tickFormat={timeFormat('%Y')}
                style={{
                  ticks: { strokeWidth: 1 },
                }}
                tickValues={getTickValuesX(
                  size,
                  parseInt(minYear, 10),
                  parseInt(maxYear, 10),
                )}
                tickPadding={2}
              />
              <YAxis
                tickFormat={value =>
                  metric.type === 'esr' ? `${value}%` : value
                }
                style={{
                  ticks: { strokeWidth: 1 },
                }}
                tickSize={3}
                tickValues={tickValuesY}
                tickPadding={2}
              />
              {scores &&
                Object.keys(scores).map(region => (
                  <LineMarkSeries
                    key={region}
                    data={getRegionData(
                      region,
                      scores,
                      metric.type,
                      benchmark,
                      intl,
                    )}
                    size={2.5}
                    style={{
                      stroke: getRegionColor(region),
                      strokeWidth: region === 'world' ? 2 : 1,
                    }}
                    fill={getRegionColor(region)}
                    onNearestX={(point, { index }) =>
                      setHighlight({ point, index })
                    }
                  />
                ))}
              {highlight && highlight.point && highlight.point.label.scores && (
                <Hint
                  value={highlight.point}
                  align={{ horizontal: 'right' }}
                  style={{
                    transform: 'translate(40%, 50%)',
                  }}
                >
                  <>
                    <PlotHintTighter color="black">
                      <div>
                        <strong>{`${highlight.point.label.year}`}</strong>
                      </div>
                      {highlight.point.label.scores.map(s => (
                        <Box direction="row" key={s.region}>
                          <div>
                            {`${s.region === 'world' ? 'World' : s.region}: ${
                              s.score
                            } (${s.count})`}
                          </div>
                        </Box>
                      ))}
                    </PlotHintTighter>
                  </>
                </Hint>
              )}
            </FlexibleWidthXYPlot>
          </WrapPlot>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}
// <Box
// margin={{
//   top: currentBenchmark.key === 'best' ? 'xsmall' : 'medium',
// }}
// >
// <Source />
// </Box>

// <Settings
//   direction="row"
//   justify="end"
//   pad="xsmall"
//   margin={{ bottom: 'small' }}
// >
//   <Box direction="row" justify="end" align="center">
//     <ButtonToggleSetting
//       active={!raw}
//       disabled={!raw}
//       onClick={() => {
//         onRawChange(false);
//       }}
//     >
//       <FormattedMessage {...rootMessages.settings.value.score} />
//     </ButtonToggleSetting>
//   </Box>
// </Settings>

// Benchmark information currently disabled
// {xyDataRefs &&
//   xyDataRefs.map(
//     ref =>
//       ref && (
//         <LineMarkSeries
//           key={ref.key}
//           data={ref.xy}
//           size={1.5}
//           style={{
//             stroke: 'black',
//             line: {
//               strokeWidth: ref.style === 'dotted' ? 2 : 1,
//             },
//             mark: {
//               strokeWidth: 1,
//             },
//             opacity: ref.style === 'dotted' ? 0.4 : 0.2,
//           }}
//           markStyle={{
//             fill: 'black',
//           }}
//           strokeDasharray={ref.style === 'dotted' && [1, 2]}
//         />
//       ),
//   )}

// benchmark references
// const xyDataRefs =
//   benchmarkRefs &&
//   benchmarkRefs.map(ref => {
//     if (typeof ref.value !== 'undefined') {
//       return {
//         xy: getDataForValue(ref.value, minYear, maxYear),
//         ...ref,
//       };
//     }
//     if (ref.refColumn) {
//       return {
//         xy: getDataForGroup(
//           scores,
//           minYear,
//           maxYear,
//           ref.refColumn,
//           PEOPLE_GROUPS[0].code,
//           metric.metricType === 'indicators' && !raw,
//         ),
//         ...ref,
//       };
//     }
//     return null;
//   });
// cpr ranges
ChartRegionMetricTrend.propTypes = {
  scores: PropTypes.object,
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  maxYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  minYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  maxValue: PropTypes.number,
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  intl: intlShape.isRequired,
};

export default withTheme(injectIntl(ChartRegionMetricTrend));
