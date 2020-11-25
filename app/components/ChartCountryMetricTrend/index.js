/**
 *
 * ChartCountryMetricTrend
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  LineSeries,
  LineMarkSeries,
  AreaSeries,
  HorizontalGridLines,
  Hint,
} from 'react-vis';
import { utcFormat as timeFormat } from 'd3-time-format';
import { formatScore } from 'utils/scores';
import { isMaxSize, isMinSize } from 'utils/responsive';

import Source from 'components/Source';

import { PEOPLE_GROUPS } from 'containers/App/constants';

import WrapPlot from 'styled/WrapPlot';

const PlotHint = styled.div`
  color: ${({ color, theme }) => theme.global.colors[color]};
  background: ${({ theme }) => theme.global.colors.white};
  padding: 5px 10px;
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme.global.edgeSize.xxsmall};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  font-weight: 700;
  width: auto;
  white-space: nowrap;
`;

const PlotHintTighter = styled(PlotHint)`
  padding: 3px 6px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: ${({ fontWeight }) => fontWeight || 700};
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
const getDataForGroup = (scores, minYear, maxYear, column, groupCode) => {
  const data = [];
  const scoresAll = groupCode
    ? scores.filter(s => s.group === groupCode)
    : scores;
  const scoresSorted = scoresAll.sort((a, b) =>
    parseInt(a.year, 10) > parseInt(b.year, 10) ? 1 : -1,
  );
  /* eslint-disable no-plusplus */
  for (let y = parseInt(minYear, 10); y <= parseInt(maxYear, 10); y++) {
    const score = scoresSorted.reduce((memo, s) => {
      const scoreYear = parseInt(s.year, 10);
      if (scoreYear === y) return s;
      return memo;
    }, null);
    if (score) {
      data.push({
        syear: y,
        x: new Date(`${y}`).getTime(),
        y: parseFloat(score[column]),
      });
    }
  }
  return data;
};
const getDataForValue = (value, minYear, maxYear) => {
  const data = [];
  /* eslint-disable no-plusplus */
  for (let y = parseInt(minYear, 10); y <= parseInt(maxYear, 10); y++) {
    data.push({
      syear: y,
      x: new Date(`${y}`).getTime(),
      y: parseFloat(value),
    });
  }
  return data;
};
function ChartCountryMetricTrend({
  scores,
  column,
  maxYear,
  minYear,
  maxValue,
  percentage,
  rangeColumns,
  rangeValues,
  colorCode,
  colorHint,
  metric,
  intl,
}) {
  const [highlight, setHighlight] = useState(false);
  const [highlightUpper, setHighlightUpper] = useState(false);
  const [highlightLower, setHighlightLower] = useState(false);
  if (!maxYear) return null;

  // dummy data to force the area plot from 0
  // with some horizontal padding, hard-coded
  const dataForceYRange = [
    { x: new Date(minYear).getTime() - 15000000000, y: 0 },
    { x: new Date(maxYear).getTime() + 15000000000, y: maxValue },
  ];
  const hasScores = scores && scores.length > 0;

  const scoresAll =
    hasScores &&
    getDataForGroup(
      scores,
      minYear,
      maxYear,
      column,
      rangeColumns ? false : PEOPLE_GROUPS[0].code,
    );
  let rangeUpper;
  let rangeLower;
  if (rangeColumns && hasScores) {
    rangeUpper = getDataForGroup(scores, minYear, maxYear, rangeColumns.upper);
    rangeLower = getDataForGroup(scores, minYear, maxYear, rangeColumns.lower);
  }
  if (rangeValues) {
    rangeUpper = getDataForValue(rangeValues.upper, minYear, maxYear);
    rangeLower = getDataForValue(rangeValues.lower, minYear, maxYear);
  }

  const tickValuesY = percentage
    ? [0, 20, 40, 60, 80, 100]
    : [0, 2, 4, 6, 8, 10];

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <div direction="column" align="start" pad={{ vertical: 'medium' }}>
          <WrapPlot metricType={metric.type}>
            <FlexibleWidthXYPlot
              height={isMinSize(size, 'medium') ? 240 : 200}
              xType="time"
              margin={{ bottom: 30, right: 10, left: percentage ? 30 : 25 }}
              onMouseLeave={() => {
                setHighlight(false);
                setHighlightUpper(false);
                setHighlightLower(false);
              }}
            >
              <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
              {hasScores && rangeUpper && (
                <AreaSeries
                  data={rangeUpper}
                  style={{
                    fill: colorCode,
                    stroke: 'transparent',
                    opacity: 0.2,
                  }}
                />
              )}
              {hasScores && rangeLower && (
                <AreaSeries
                  data={rangeLower}
                  style={{
                    fill: 'white',
                    stroke: 'white',
                    opacity: 1,
                    strokeWidth: 1,
                  }}
                />
              )}
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
                tickFormat={value => (percentage ? `${value}%` : value)}
                style={{
                  ticks: { strokeWidth: 1 },
                }}
                tickSize={3}
                tickValues={tickValuesY}
                tickPadding={2}
              />
              {hasScores && rangeUpper && (
                <LineSeries
                  data={rangeUpper}
                  style={{ stroke: colorCode, opacity: 0.8, strokeWidth: 1 }}
                  onNearestX={(point, { index }) =>
                    setHighlightUpper({ point, index })
                  }
                />
              )}
              {hasScores && rangeLower && (
                <LineSeries
                  data={rangeLower}
                  style={{ stroke: colorCode, opacity: 0.8, strokeWidth: 1 }}
                  onNearestX={(point, { index }) =>
                    setHighlightLower({ point, index })
                  }
                />
              )}
              {scoresAll && (
                <LineMarkSeries
                  data={scoresAll}
                  size={2.5}
                  style={{
                    stroke: colorCode,
                    strokeWidth: 1,
                  }}
                  fill={
                    metric.metricType === 'indicators' ? 'white' : colorCode
                  }
                  onNearestX={(point, { index }) =>
                    setHighlight({ point, index })
                  }
                />
              )}
              {highlight && highlight.point && (
                <Hint
                  value={highlight.point}
                  align={{ horizontal: 'right' }}
                  style={{
                    transform: 'translate(40%, 50%)',
                  }}
                >
                  <>
                    {highlightUpper && highlightUpper.point && (
                      <PlotHintTighter color={colorHint} fontWeight={500}>
                        {`${formatScore(highlightUpper.point.y, 1, intl)}${
                          percentage ? '%' : ''
                        }`}
                      </PlotHintTighter>
                    )}
                    <PlotHintTighter color={colorHint}>
                      {`${formatScore(highlight.point.y, 1, intl)}${
                        percentage ? '%' : ''
                      }`}
                    </PlotHintTighter>
                    {highlightUpper && highlightLower.point && (
                      <PlotHintTighter color={colorHint} fontWeight={500}>
                        {`${formatScore(highlightLower.point.y, 1, intl)}${
                          percentage ? '%' : ''
                        }`}
                      </PlotHintTighter>
                    )}
                  </>
                </Hint>
              )}
            </FlexibleWidthXYPlot>
          </WrapPlot>
          <Box>
            <Source />
          </Box>
        </div>
      )}
    </ResponsiveContext.Consumer>
  );
}

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
ChartCountryMetricTrend.propTypes = {
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  rangeColumns: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rangeValues: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  column: PropTypes.string,
  maxYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  minYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  colorCode: PropTypes.string,
  colorHint: PropTypes.string,
  maxValue: PropTypes.number,
  percentage: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(ChartCountryMetricTrend);
