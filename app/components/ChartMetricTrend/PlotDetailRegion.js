/**
 *
 * PlotDetailRegion
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { withTheme } from 'styled-components';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  LineSeries,
  AreaSeries,
  HorizontalGridLines,
  MarkSeries,
} from 'react-vis';
import { utcFormat as timeFormat } from 'd3-time-format';

import { COLUMNS } from 'containers/App/constants';

import {
  getCountryData,
  getCountryYearData,
  sortRegions,
  getRegionData,
  getRegionYearData,
  getRegionDataLow,
  getRegionDataHigh,
} from 'utils/charts';

// const isEven = n => n % 2 === 0;
// const isOdd = n => Math.abs(n % 2) === 1;

function PlotDetailRegion({
  theme,
  height,
  highlightCountry,
  highlightRegion,
  countriesScores,
  regionScores,
  year,
  column,
  metric,
  unRegionFilterValue,
  onCountryClick,
  setYear,
  setCountry,
  setRegion,
  tickValuesX,
  tickValuesY,
  dataForceYRange,
  onSetRegionFilter,
}) {
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
        cursor: highlightRegion || highlightCountry ? 'pointer' : 'default',
      }}
      onMouseLeave={() => {
        setRegion(false);
        setCountry(false);
      }}
      onClick={() => {
        if (highlightCountry) {
          onCountryClick(highlightCountry);
        }
        if (!highlightCountry) {
          onCountryClick();
        }
        if (highlightRegion) {
          onSetRegionFilter(highlightRegion);
        }
      }}
    >
      <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
      {/* CPR region credible interval */}
      {metric.type === 'cpr' &&
        regionScores &&
        !highlightCountry &&
        Object.keys(regionScores)
          .filter(
            region =>
              region === highlightRegion || region === unRegionFilterValue,
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
            />,
          ])}
      {/* CPR highlighted country credible interval */}
      {metric.type === 'cpr' &&
        countriesScores &&
        highlightCountry &&
        Object.keys(countriesScores)
          .filter(country => country === highlightCountry)
          .map(country => {
            // TODO consider colour by region
            const color = unRegionFilterValue;
            return [
              <AreaSeries
                data={getCountryData(countriesScores[country][COLUMNS.CPR.HI])}
                style={{
                  fill: theme.global.colors[color],
                  stroke: 'transparent',
                  opacity: 0.2,
                }}
              />,
              <AreaSeries
                data={getCountryData(countriesScores[country][COLUMNS.CPR.LO])}
                style={{
                  fill: 'white',
                  stroke: 'white',
                  opacity: 1,
                  strokeWidth: 1,
                }}
              />,
            ];
          })}
      <HorizontalGridLines
        tickValues={tickValuesY}
        style={{
          stroke: 'rgba(136, 150, 160, 0.2)',
        }}
      />
      <XAxis
        tickFormat={timeFormat('%Y')}
        style={{
          line: { strokeWidth: 0 },
          ticks: { strokeWidth: 1 },
        }}
        tickValues={tickValuesX}
        tickPadding={2}
      />
      <YAxis
        tickFormat={value => (metric.type === 'esr' ? `${value}%` : value)}
        style={{
          line: { strokeWidth: 0 },
          ticks: { strokeWidth: 1 },
        }}
        tickSize={3}
        tickValues={tickValuesY}
        tickPadding={2}
      />
      {/* all country lines except when highlighted */}
      {countriesScores &&
        Object.keys(countriesScores)
          .filter(c => c !== highlightCountry)
          .map(country => (
            <LineSeries
              key={country}
              data={getCountryData(countriesScores[country][column])}
              style={{
                stroke: theme.global.colors['dark-5'],
                strokeWidth: 1,
              }}
              onSeriesMouseOver={() => {
                setCountry(country);
                setRegion(false);
              }}
            />
          ))}
      {/* all region lines */}
      {regionScores &&
        Object.keys(regionScores)
          .sort((a, b) => sortRegions(a, b, highlightRegion))
          .map(region => {
            const color =
              !highlightRegion || highlightRegion === region
                ? theme.global.colors[region]
                : theme.global.colors['dark-4'];
            let strokeWidth =
              !highlightRegion || highlightRegion === region ? 2.5 : 1.5;
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
                  setRegion(region);
                }}
              />
            );
          })}
      {/* all region markers except highlighted (could altern. sort) */}
      {regionScores &&
        Object.keys(regionScores)
          .sort((a, b) => sortRegions(a, b, highlightRegion))
          .map(region => {
            const color =
              !highlightRegion || highlightRegion === region
                ? theme.global.colors[region]
                : theme.global.colors['dark-4'];
            const msize = 4;
            return (
              <MarkSeries
                key={region}
                data={getRegionYearData(year, regionScores[region][column])}
                stroke={color}
                fill={color}
                size={msize}
              />
            );
          })}
      {/* highlighted country line */}
      {countriesScores &&
        highlightCountry &&
        unRegionFilterValue &&
        Object.keys(countriesScores)
          .filter(c => c === highlightCountry)
          .map(country => (
            <LineSeries
              key={country}
              data={getCountryData(countriesScores[country][column])}
              style={{
                stroke: theme.global.colors[unRegionFilterValue],
                strokeWidth: 1,
              }}
            />
          ))}
      {/* highlighted country marker */}
      {countriesScores &&
        highlightCountry &&
        unRegionFilterValue &&
        Object.keys(countriesScores)
          .filter(c => c === highlightCountry)
          .map(country => (
            <MarkSeries
              key={country}
              data={getCountryYearData(year, countriesScores[country][column])}
              stroke={theme.global.colors[unRegionFilterValue]}
              fill={theme.global.colors[unRegionFilterValue]}
              size={3}
            />
          ))}
    </FlexibleWidthXYPlot>
  );
}
PlotDetailRegion.propTypes = {
  theme: PropTypes.object,
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onCountryClick: PropTypes.func,
  onSetRegionFilter: PropTypes.func,
  setYear: PropTypes.func,
  highlightRegion: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  highlightCountry: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setCountry: PropTypes.func,
  setRegion: PropTypes.func,
  tickValuesX: PropTypes.array,
  tickValuesY: PropTypes.array,
  dataForceYRange: PropTypes.array,
  regionScores: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countriesScores: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  year: PropTypes.string,
  column: PropTypes.string,
  height: PropTypes.number,
};

export default withTheme(PlotDetailRegion);
