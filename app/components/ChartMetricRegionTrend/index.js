/**
 *
 * ChartMetricRegionTrend
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { intlShape, injectIntl } from 'react-intl';
import { withTheme } from 'styled-components';
import { ResponsiveContext } from 'grommet';
// import { Box, Text, ResponsiveContext } from 'grommet';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  LineSeries,
  AreaSeries,
  HorizontalGridLines,
  MarkSeries,
  // Hint,
} from 'react-vis';
import { utcFormat as timeFormat } from 'd3-time-format';
import { isMaxSize, isMinSize } from 'utils/responsive';

import WrapPlot from 'styled/WrapPlot';
import ScoreSheet from './ScoreSheet';

// import rootMessages from 'messages';?

// const PlotHint = styled.div`
//   color: ${({ color, theme }) => theme.global.colors[color]};
//   background: ${({ theme }) => theme.global.colors.white};
//   padding: 5px 10px;
//   margin-bottom: 10px;
//   border-radius: ${({ theme }) => theme.global.edgeSize.xxsmall};
//   box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
//   width: auto;
//   white-space: nowrap;
// `;

// const PlotHintTighter = styled(PlotHint)`
//   padding: 3px 6px;
//   margin-bottom: 5px;
//   font-size: 14px;
// `;

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

// prettier-ignore
const getRegionYearData = (year, regionColumnScores) =>
  regionColumnScores[year]
    ? [({
      syear: year,
      x: new Date(`${year}`).getTime(),
      y: parseFloat(regionColumnScores[year].average),
    })]
    : [];
const getRegionData = regionColumnScores =>
  Object.keys(regionColumnScores).reduce(
    (memo, year) => [...memo, ...getRegionYearData(year, regionColumnScores)],
    [],
  );
// prettier-ignore
const getCountryYearData = (year, countryColumnScores) =>
  countryColumnScores[year]
    ? [({
      syear: year,
      x: new Date(`${year}`).getTime(),
      y: parseFloat(countryColumnScores[year].score),
    })]
    : [];
// const getCountryData = (country, scores, metricType, benchmarkKey, intl) => {
const getCountryData = countryColumnScores =>
  Object.keys(countryColumnScores).reduce(
    (memo, year) => [...memo, ...getCountryYearData(year, countryColumnScores)],
    [],
  );

function ChartMetricRegionTrend({
  scores,
  maxYear,
  minYear,
  maxValue,
  benchmark,
  metric,
  theme,
  mode,
  unRegionFilterValue,
  onCountryClick,
}) {
  const [highlightYear, setYear] = useState(false);
  const [highlightCountry, setCountry] = useState(false);
  if (!maxYear) return null;
  const column = metric.type === 'cpr' ? 'mean' : benchmark;

  // dummy data to force the area plot from 0
  // with some horizontal padding, hard-coded
  const dataForceYRange = [
    { x: new Date(minYear).getTime() - 15000000000, y: 0 },
    { x: new Date(maxYear).getTime() + 15000000000, y: maxValue },
  ];
  const isESR = metric.type === 'esr';
  const tickValuesY = isESR ? [0, 20, 40, 60, 80, 100] : [0, 2, 4, 6, 8, 10];
  const regionScores = scores.regions;
  const countryScores = scores.countries;

  // {mode === 'regions' && (
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <WrapPlot mode={mode}>
          <ScoreSheet
            height={isMinSize(size, 'medium') ? 240 : 200}
            margin={{ bottom: 30, top: 10 }}
            regionScores={regionScores}
            countryScores={countryScores}
            year={highlightYear || maxYear}
            highlightCountry={highlightCountry}
            column={column}
            metric={metric}
          />
          <FlexibleWidthXYPlot
            height={isMinSize(size, 'medium') ? 240 : 200}
            xType="time"
            margin={{ bottom: 30, top: 10, right: 10, left: isESR ? 30 : 25 }}
            onMouseLeave={() => {
              setCountry(false);
              setYear(false);
            }}
            onClick={() => {
              if (mode === 'regions' && highlightCountry) {
                onCountryClick(highlightCountry)
              }
              if (mode === 'regions' && !highlightCountry) {
                onCountryClick()
              }
            }}
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
            {countryScores &&
              Object.keys(countryScores).map(country => (
                <LineSeries
                  key={country}
                  data={getCountryData(
                    countryScores[country][column],
                  )}
                  style={{
                    stroke: 'lightgrey',
                    strokeWidth: 1,
                  }}
                  onSeriesMouseOver={() => {
                    setCountry(country)
                  }}
                />
              ))}
            {regionScores &&
              Object.keys(regionScores).map(region => (
                <LineSeries
                  key={region}
                  data={getRegionData(
                    regionScores[region][column],
                  )}
                  style={{
                    stroke: theme.global.colors[region],
                    strokeWidth: 2,
                  }}
                  onNearestX={point => {
                    setYear(point.syear)
                  }}
                />
              ))}
            {regionScores &&
              Object.keys(regionScores).map(region => (
                <MarkSeries
                  key={region}
                  data={getRegionYearData(
                    highlightYear || maxYear,
                    regionScores[region][column],
                  )}
                  stroke={theme.global.colors[region]}
                  fill={theme.global.colors[region]}
                  size={4}
                />
              ))}
            {countryScores && highlightCountry && unRegionFilterValue &&
              Object.keys(countryScores).filter(c => c === highlightCountry).map(country => (
                <LineSeries
                  key={country}
                  data={getCountryData(
                    countryScores[country][column],
                  )}
                  style={{
                    stroke: theme.global.colors[unRegionFilterValue],
                    strokeWidth: 1,
                  }}
                />
              ))}
            {countryScores && highlightCountry && unRegionFilterValue &&
              Object.keys(countryScores).filter(c => c === highlightCountry).map(country => (
                <MarkSeries
                  key={country}
                  data={getCountryYearData(
                    highlightYear || maxYear,
                    countryScores[country][column],
                  )}
                  stroke={theme.global.colors[unRegionFilterValue]}
                  fill={theme.global.colors[unRegionFilterValue]}
                  size={3}
                />
              ))}
          </FlexibleWidthXYPlot>
        </WrapPlot>
      )}
    </ResponsiveContext.Consumer>
  );
}
// {mode !== 'regions' &&
//   highlight &&
//   highlight.point &&
//   highlight.point.label.scores && (
//   <Hint
//     value={highlight.point}
//     align={{ horizontal: 'right' }}
//     style={{
//       transform: 'translate(40%, 50%)',
//     }}
//   >
//     <PlotHintTighter color="black">
//       <div>
//         <strong>{`${highlight.point.label.year}`}</strong>
//       </div>
//       {highlight.point.label.scores.map(s => (
//         <Box direction="row" key={s.region}>
//           <div>
//             {`${s.region === 'world' ? 'World' : s.region}: ${
//               s.score
//             } (${s.count})`}
//           </div>
//         </Box>
//       ))}
//     </PlotHintTighter>
//   </Hint>
// )}
ChartMetricRegionTrend.propTypes = {
  theme: PropTypes.object,
  scores: PropTypes.object,
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  maxYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  minYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  maxValue: PropTypes.number,
  mode: PropTypes.string,
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // intl: intlShape.isRequired,
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onCountryClick: PropTypes.func,
};

// export default withTheme(injectIntl(ChartMetricRegionTrend));
export default withTheme(ChartMetricRegionTrend);
