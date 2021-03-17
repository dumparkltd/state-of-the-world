/**
 *
 * ChartMetricTrend
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withTheme } from 'styled-components';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  LineSeries,
  AreaSeries,
  HorizontalGridLines,
  MarkSeries,
  Hint,
} from 'react-vis';
import { utcFormat as timeFormat } from 'd3-time-format';

import { COLUMNS } from 'containers/App/constants';

import {
  sortRegions,
  getRegionData,
  getRegionYearData,
  getRegionDataLow,
  getRegionDataHigh,
} from 'utils/charts';

import rootMessages from 'messages';
import PlotHintHighlight from './PlotHintHighlight';

// const isEven = n => n % 2 === 0;
// const isOdd = n => Math.abs(n % 2) === 1;

function PlotMultiRegion({
  theme,
  height,
  highlightRegion,
  regionScores,
  year,
  column,
  metric,
  unRegionFilterValue,
  onSetRegionFilter,
  setYear,
  setRegion,
  tickValuesX,
  tickValuesY,
  dataForceYRange,
}) {
  let highlightRegionHint;
  if (
    highlightRegion &&
    regionScores &&
    regionScores[highlightRegion] &&
    regionScores[highlightRegion][column]
  ) {
    const regionColumnScores = regionScores[highlightRegion][column];
    const years = Object.keys(regionColumnScores);
    highlightRegionHint = getRegionYearData(years[0], regionColumnScores);
  }
  // console.log(metric, regionScores)
  // prettier-ignore
  return (
    <FlexibleWidthXYPlot
      height={height}
      xType="time"
      margin={{
        bottom: 20,
        top: 10,
        right: 10,
        left: 30,
      }}
      style={{
        cursor: highlightRegion ? 'pointer' : 'default',
      }}
      onMouseLeave={() => {
        setRegion(false);
        // setYear(false);
      }}
      onClick={() => {
        if (highlightRegion) {
          onSetRegionFilter(highlightRegion);
        }
        if (!highlightRegion) {
          onSetRegionFilter();
        }
      }}
    >
      <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
      {/* CPR region credible intervals */}
      {metric.type === 'cpr' &&
        regionScores &&
        Object.keys(regionScores)
          .filter(region =>
            highlightRegion
              ? region === highlightRegion
              : region === unRegionFilterValue,
          )
          .map(region => [
            <AreaSeries
              data={getRegionDataHigh(
                regionScores[region][COLUMNS.CPR.SD],
                regionScores[region][COLUMNS.CPR.MEAN],
                80,
              )}
              style={{
                fill: theme.global.colors[region],
                stroke: 'transparent',
                opacity: 0.2,
              }}
            />,
            <AreaSeries
              data={getRegionDataLow(
                regionScores[region][COLUMNS.CPR.SD],
                regionScores[region][COLUMNS.CPR.MEAN],
                80,
              )}
              style={{
                fill: 'white',
                stroke: 'white',
                opacity: 1,
                strokeWidth: 1,
              }}
            />
          ])}
      <HorizontalGridLines
        tickValues={tickValuesY}
        style={{ stroke: 'rgba(136, 150, 160, 0.2)' }}
      />
      <XAxis
        tickFormat={timeFormat('%Y')}
        style={{
          ticks: { strokeWidth: 1 },
        }}
        tickValues={tickValuesX}
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
      {/* all region lines except when highlighted */}
      {regionScores &&
        Object.keys(regionScores)
          .filter(
            region =>
              region !== highlightRegion ||
              region === unRegionFilterValue,
          )
          .sort((a, b) => sortRegions(a, b, unRegionFilterValue))
          .map(region => {
            let color = theme.global.colors['dark-5'];
            let strokeWidth = 1;
            if (region === unRegionFilterValue) {
              color = theme.global.colors[region];
              strokeWidth = 2.5;
            }
            if (metric.type === 'cpr') {
              strokeWidth = 1.5;
            }
            return (
              <LineSeries
                key={region}
                data={getRegionData(regionScores[region][column])}
                style={{
                  stroke: color,
                  strokeWidth,
                }}
                onNearestX={point => {
                  setYear(point.syear);
                }}
                onSeriesMouseOver={() => {
                  if (region !== unRegionFilterValue) {
                    setRegion(region);
                  } else {
                    setRegion(false)
                  }
                }}
              />
            );
          })}
      {/* active region marker */}
      {regionScores &&
        Object.keys(regionScores)
          .filter(region => region === unRegionFilterValue)
          .map(region => {
            const color = theme.global.colors[region]
            const msize = 4;
            return (
              <MarkSeries
                key={region}
                data={getRegionYearData(
                  year,
                  regionScores[region][column],
                )}
                stroke={color}
                fill={color}
                size={msize}
              />
            );
          })}
      {/* highlighted region line only */}
      {regionScores &&
        highlightRegion &&
        highlightRegion !== unRegionFilterValue &&
        Object.keys(regionScores)
          .filter(r => r === highlightRegion)
          .map(region => (
            <LineSeries
              key={region}
              data={getRegionData(regionScores[region][column])}
              style={{
                stroke: theme.global.colors[highlightRegion],
                strokeWidth: metric.type === 'cpr' ? 1 : 1.5,
              }}
            />
          ))}
      {highlightRegionHint &&
        highlightRegionHint.length > 0 && (
        <Hint
          value={highlightRegionHint[0]}
          align={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <PlotHintHighlight>
            <FormattedMessage
              {...rootMessages.un_regions[highlightRegion]}
            />
          </PlotHintHighlight>
        </Hint>
      )}
    </FlexibleWidthXYPlot>
  );
}
// {/* highlighted region marker only */}
// {regionScores &&
//   highlightRegion &&
//   highlightRegion !== unRegionFilterValue &&
//   Object.keys(regionScores)
//     .filter(r => r === highlightRegion)
//     .map(region => (
//       <MarkSeries
//         key={region}
//         data={getRegionYearData(
//           year,
//           regionScores[region][column],
//         )}
//         stroke={theme.global.colors[highlightRegion]}
//         fill={theme.global.colors[highlightRegion]}
//         size={3}
//       />
//     ))}
PlotMultiRegion.propTypes = {
  theme: PropTypes.object,
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onSetRegionFilter: PropTypes.func,
  setYear: PropTypes.func,
  highlightRegion: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setRegion: PropTypes.func,
  tickValuesX: PropTypes.array,
  tickValuesY: PropTypes.array,
  dataForceYRange: PropTypes.array,
  regionScores: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  year: PropTypes.string,
  column: PropTypes.string,
  height: PropTypes.number,
};

export default withTheme(PlotMultiRegion);
