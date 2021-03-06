/**
 *
 * ChartMetricTrend
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

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
  ChartLabel,
} from 'react-vis';
import { utcFormat as timeFormat } from 'd3-time-format';

import {
  getCountryData,
  getCountryYearData,
  sortRegions,
  getRegionData,
  getXTime,
} from 'utils/charts';
import { formatScore } from 'utils/scores';

import { COLUMNS, TYPES } from 'containers/App/constants';
import PlotHintHighlight from './PlotHintHighlight';
import PlotHintWrapper from './PlotHintWrapper';
import messages from './messages';

// const isEven = n => n % 2 === 0;
// const isOdd = n => Math.abs(n % 2) === 1;

const checkDataAvailable = (scores, column) =>
  Object.values(scores[column]).length > 0;

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
  currentRegion,
  setYear,
  tickValuesX,
  tickValuesY,
  dataForceYRange,
}) {
  let countryYearData;
  if (countryScores && countryScores[column]) {
    countryYearData = getCountryYearData(year, countryScores[column], true);
  }
  // const hasData = false;
  const hasData = checkDataAvailable(countryScores, column);
  // prettier-ignore
  return (
    <FlexibleWidthXYPlot
      height={height}
      xType="time"
      margin={{
        bottom: 30,
        top: 10,
        right: 18,
        left: metric.type === 'esr' ? 38 : 28,
      }}
    >
      <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
      {countryScores && metric.type === 'cpr' && (
        <AreaSeries
          data={getCountryData(countryScores[COLUMNS.CPR.HI])}
          style={{
            fill: theme.global.colors[currentRegion],
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
      {countryScores && metric.type === 'vdem' && (
        <AreaSeries
          data={getCountryData(countryScores[COLUMNS.VDEM.HI])}
          style={{
            fill: theme.global.colors[currentRegion],
            stroke: 'transparent',
            opacity: 0.1,
          }}
        />
      )}
      {countryScores && metric.type === 'vdem' && (
        <AreaSeries
          data={getCountryData(countryScores[COLUMNS.VDEM.LO])}
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
          line: { strokeWidth: 0 },
          ticks: { strokeWidth: 1 },
        }}
        tickValues={tickValuesX}
        tickPadding={2}
      />
      <XAxis
        tickFormat={timeFormat('%Y')}
        style={{
          line: { strokeWidth: 0 },
          ticks: { strokeWidth: 0 },
          text: {
            fontWeight: 700,
            textShadow: theme.global.outline,
          },
        }}
        tickValues={[getXTime(year)]}
        tickPadding={2}
      />
      <YAxis
        tickFormat={value =>
          TYPES[metric.type] && TYPES[metric.type].isPerc ? `${value}%` : value
        }
        style={{
          line: { strokeWidth: 0 },
          ticks: { strokeWidth: 1 },
        }}
        tickSize={3}
        tickValues={tickValuesY}
        tickPadding={2}
      />
      {regionScores &&
        Object.keys(regionScores)
          .sort((a, b) =>
            sortRegions(a, b, currentRegion, highlightRegion),
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
            stroke: theme.global.colors[currentRegion],
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
          stroke={theme.global.colors[currentRegion]}
          fill={theme.global.colors[currentRegion]}
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
            pointerEvents: 'none',
          }}
        >
          <PlotHintWrapper vertical="top">
            <PlotHintHighlight color={currentRegion} active>
              {formatScore(
                countryYearData[0].y,
                metric.type,
                intl,
              )}
            </PlotHintHighlight>
          </PlotHintWrapper>
        </Hint>
      )}
      {!hasData && (
        <ChartLabel
          text={intl.formatMessage(messages.noDataForCountry)}
          className="sotw-chart-nodata-watermark-small"
          includeMargin={false}
          xPercent={0.5}
          yPercent={1}
        />
      )}
    </FlexibleWidthXYPlot>
  );
}
PlotMultiCountry.propTypes = {
  theme: PropTypes.object,
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  currentRegion: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setYear: PropTypes.func,
  highlightRegion: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
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
