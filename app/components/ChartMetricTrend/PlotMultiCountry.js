/**
 *
 * ChartMetricTrend
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import styled, { withTheme } from 'styled-components';
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

import {
  getCountryData,
  getCountryYearData,
  sortRegions,
  getRegionData,
} from 'utils/charts';
import { formatScoreMax } from 'utils/scores';

import { COLUMNS } from 'containers/App/constants';

const PlotHint = styled.div`
  color: ${({ color, theme }) => (color ? theme.global.colors[color] : 'grey')};
  padding: 2px;
  margin-bottom: 5px;
  width: auto;
  font-weight: 600;
`;

// const isEven = n => n % 2 === 0;
// const isOdd = n => Math.abs(n % 2) === 1;

function PlotMultiCountry({
  intl,
  theme,
  height,
  highlightRegion,
  regionScores,
  countryScores,
  year,
  column,
  metric,
  unRegionFilterValue,
  setYear,
  tickValuesX,
  tickValuesY,
  dataForceYRange,
}) {
  let countryYearData;
  if (countryScores && countryScores[column]) {
    countryYearData =
      Object.keys(countryScores[column]).length > 1
        ? getCountryYearData(year, countryScores[column])
        : getCountryData(countryScores[column]);
  }
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
    >
      <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
      {countryScores && metric.type === 'cpr' && (
        <AreaSeries
          data={getCountryData(countryScores[COLUMNS.CPR.HI])}
          style={{
            fill: theme.global.colors[unRegionFilterValue],
            stroke: 'transparent',
            opacity: 0.1,
          }}
        />
      )}
      {countryScores && metric.type === 'cpr' && (
        <AreaSeries
          data={getCountryData(countryScores[COLUMNS.CPR.LO])}
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
      {regionScores &&
        Object.keys(regionScores)
          .sort((a, b) =>
            sortRegions(a, b, unRegionFilterValue, highlightRegion),
          )
          .map(region => {
            const color = 'grey';
            const strokeWidth = 1;
            return (
              <LineSeries
                key={region}
                data={getRegionData(regionScores[region][column])}
                style={{
                  stroke: color,
                  strokeWidth,
                }}
                strokeDasharray ={[2, 5]}
                onNearestX={point => {
                  setYear(point.syear);
                }}
              />
            );
          })}
      {countryScores && (
        <LineSeries
          data={getCountryData(countryScores[column])}
          style={{
            stroke: theme.global.colors[unRegionFilterValue],
            strokeWidth: 1.5,
          }}
          onNearestX={point => {
            setYear(point.syear);
          }}
        />
      )}
      {countryYearData && (
        <MarkSeries
          data={countryYearData}
          stroke={theme.global.colors[unRegionFilterValue]}
          fill={theme.global.colors[unRegionFilterValue]}
          size={3}
        />
      )}
      {countryYearData &&
        countryYearData.length > 0 && (
        <Hint
          value={countryYearData[0]}
          align={{ vertical: 'top', horizontal: 'left' }}
          style={{
            transform: 'translateX(50%)',
          }}
        >
          <PlotHint color={unRegionFilterValue}>
            {formatScoreMax(
              countryYearData[0].y,
              metric.type === 'esr' ? 100 : 10,
              1,
              false,
              intl,
            )}
          </PlotHint>
        </Hint>
      )}
    </FlexibleWidthXYPlot>
  );
}
PlotMultiCountry.propTypes = {
  theme: PropTypes.object,
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setYear: PropTypes.func,
  highlightRegion: PropTypes.string,
  tickValuesX: PropTypes.array,
  tickValuesY: PropTypes.array,
  dataForceYRange: PropTypes.array,
  regionScores: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryScores: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  year: PropTypes.string,
  column: PropTypes.string,
  height: PropTypes.number,
  intl: intlShape.isRequired,
};

export default withTheme(injectIntl(PlotMultiCountry));
