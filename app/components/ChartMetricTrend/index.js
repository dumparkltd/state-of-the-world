/**
 *
 * ChartMetricTrend
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import styled, { withTheme } from 'styled-components';
import { ResponsiveContext } from 'grommet';
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

import { isMinSize } from 'utils/responsive';
import {
  getXTime,
  getTickValuesY,
  getTickValuesX,
  getCountryData,
  getCountryYearData,
  sortRegions,
  getRegionData,
  getRegionYearData,
} from 'utils/charts';
import { formatScoreMax } from 'utils/scores';

import { COLUMNS } from 'containers/App/constants';

import Card from 'styled/Card';
import rootMessages from 'messages';

import CardHeader from './CardHeader';
import CardFooter from './CardFooter';
import ScoreSheet from './ScoreSheet';

const PlotHint = styled.div`
  color: ${({ color, theme }) => (color ? theme.global.colors[color] : 'grey')};
  padding: 2px;
  margin-bottom: 5px;
  width: auto;
  font-weight: 600;
`;
const PlotHintRegion = styled.div`
  color: grey;
  margin-bottom: 2px;
  width: 100px;
  font-size: 10px;
  line-height: 12px;
  text-align: left;
`;

// const isEven = n => n % 2 === 0;
// const isOdd = n => Math.abs(n % 2) === 1;

function ChartMetricTrend({
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
  onSetRegionFilter,
  onSelectMetric,
  intl,
  unRegionTotals,
}) {
  const [highlightYear, setYear] = useState(false);
  const [highlightCountry, setCountry] = useState(false);
  const [highlightRegion, setRegion] = useState(false);
  if (!maxYear || !scores) return null;
  const column = metric.type === 'cpr' ? COLUMNS.CPR.MEAN : benchmark;

  // dummy data to force the area plot from 0
  // with some horizontal padding, hard-coded
  const dataForceYRange = [
    { x: getXTime(minYear) - 15000000000, y: 0 },
    { x: getXTime(maxYear) + 15000000000, y: maxValue },
  ];
  const tickValuesY = getTickValuesY(metric.type, mode);
  const countryScores = mode === 'multi-country' && scores.country;
  const regionScores = scores.regions;
  const countriesScores = scores.countries;
  const year = highlightYear || maxYear;
  let countryYearData;
  if (mode === 'multi-country' && countryScores && countryScores[column]) {
    countryYearData =
      Object.keys(countryScores[column]).length > 1
        ? getCountryYearData(year, countryScores[column])
        : getCountryData(countryScores[column]);
  }
  const regionMinYearData =
    mode === 'multi-country' &&
    regionScores &&
    getRegionYearData(minYear, regionScores[unRegionFilterValue][column]);

  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => {
        let h = mode === 'detail' ? 200 : 130;
        if (isMinSize(size, 'medium')) {
          h = mode === 'detail' ? 280 : 140;
        }
        const tickValuesX = getTickValuesX(
          size,
          mode,
          parseInt(minYear, 10),
          parseInt(maxYear, 10),
        );
        return (
          <Card
            mode={mode}
            onMouseLeave={() => {
              setYear(false);
            }}
          >
            {(mode === 'multi' || mode === 'multi-country') &&
              unRegionFilterValue && (
              <CardHeader
                onSelectMetric={onSelectMetric}
                regionScores={regionScores}
                year={year}
                column={column}
                metric={metric}
                unRegionFilterValue={unRegionFilterValue}
                mode={mode}
              />
            )}
            {mode === 'detail' && (
              <ScoreSheet
                height={h}
                margin={{ bottom: 30, top: 10 }}
                highlightCountry={highlightCountry}
                countriesScores={countriesScores}
                regionScores={regionScores}
                year={year}
                column={column}
                metric={metric}
              />
            )}
            <FlexibleWidthXYPlot
              height={h}
              xType="time"
              margin={{
                bottom: 20,
                top: 10,
                right: 10,
                left: 30,
              }}
              onMouseLeave={() => {
                setCountry(false);
                setRegion(false);
                // setYear(false);
              }}
              onClick={() => {
                if (mode === 'detail' && highlightCountry) {
                  onCountryClick(highlightCountry);
                }
                if (mode === 'detail' && !highlightCountry) {
                  onCountryClick();
                }
                if (mode === 'multi' && highlightRegion) {
                  onSetRegionFilter(highlightRegion);
                }
                if (mode === 'multi' && !highlightRegion) {
                  onSetRegionFilter();
                }
              }}
            >
              <AreaSeries data={dataForceYRange} style={{ opacity: 0 }} />
              {mode === 'multi-country' && countryScores && metric.type === 'cpr' && (
                <AreaSeries
                  data={getCountryData(countryScores[COLUMNS.CPR.HI])}
                  style={{
                    fill: theme.global.colors[unRegionFilterValue],
                    stroke: 'transparent',
                    opacity: 0.1,
                  }}
                />
              )}
              {mode === 'multi-country' && countryScores && metric.type === 'cpr' && (
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
              {mode === 'detail' &&
                countriesScores &&
                Object.keys(countriesScores).map(country => (
                  <LineSeries
                    key={country}
                    data={getCountryData(countriesScores[country][column])}
                    style={{
                      stroke: 'lightgrey',
                      strokeWidth: 1,
                    }}
                    onSeriesMouseOver={() => {
                      setCountry(country);
                    }}
                  />
                ))}
              {regionScores &&
                Object.keys(regionScores)
                  .sort((a, b) =>
                    sortRegions(
                      sortRegions(a, b, unRegionFilterValue, highlightRegion),
                    ),
                  )
                  .map(region => {
                    let color = 'grey';
                    let strokeWidth = 1;
                    if (mode === 'detail') {
                      color = theme.global.colors[region];
                      strokeWidth = 2.5;
                    } else if (
                      mode === 'multi' &&
                      region === unRegionFilterValue
                    ) {
                      color = theme.global.colors[region];
                      strokeWidth = 2.5;
                    }
                    return (
                      <LineSeries
                        key={region}
                        data={getRegionData(regionScores[region][column])}
                        style={{
                          stroke: color,
                          strokeWidth,
                        }}
                        strokeDasharray ={mode === 'multi-country' ? [2, 5] : null}
                        onNearestX={point => {
                          setYear(point.syear);
                        }}
                        onSeriesMouseOver={() => {
                          setRegion(region);
                        }}
                      />
                    );
                  })}
              {mode === 'multi-country' &&
                regionMinYearData &&
                regionMinYearData.length > 0 && (
                <Hint
                  value={regionMinYearData[0]}
                  align={{ vertical: 'top', horizontal: 'right' }}
                >
                  <PlotHintRegion>
                    <FormattedMessage
                      {...rootMessages.labels.regionRefScore}
                    />
                  </PlotHintRegion>
                </Hint>
              )}
              {mode === 'multi-country' && countryScores && (
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
              {mode === 'multi-country' && countryScores && (
                <MarkSeries
                  data={countryYearData}
                  stroke={theme.global.colors[unRegionFilterValue]}
                  fill={theme.global.colors[unRegionFilterValue]}
                  size={3}
                />
              )}
              {mode === 'multi-country' &&
                countryYearData &&
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
              {(mode === 'multi' || mode === 'detail') &&
                regionScores &&
                Object.keys(regionScores)
                  .filter(
                    region =>
                      mode !== 'multi' ||
                      region === unRegionFilterValue ||
                      region === highlightRegion,
                  )
                  .map(region => {
                    let color = 'grey';
                    let msize = 3;
                    if (mode === 'detail') {
                      color = theme.global.colors[region]
                      msize = 4;
                    } else if (
                      mode === 'multi' &&
                      region === unRegionFilterValue
                    ) {
                      color = theme.global.colors[region]
                      msize = 4;
                    }
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
              {mode === 'detail' &&
                countriesScores &&
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
              {mode === 'detail' &&
                countriesScores &&
                highlightCountry &&
                unRegionFilterValue &&
                Object.keys(countriesScores)
                  .filter(c => c === highlightCountry)
                  .map(country => (
                    <MarkSeries
                      key={country}
                      data={getCountryYearData(
                        year,
                        countriesScores[country][column],
                      )}
                      stroke={theme.global.colors[unRegionFilterValue]}
                      fill={theme.global.colors[unRegionFilterValue]}
                      size={3}
                    />
                  ))}
              {mode === 'multi' &&
                regionScores &&
                highlightRegion &&
                Object.keys(regionScores)
                  .filter(r => r === highlightRegion)
                  .map(region => (
                    <LineSeries
                      key={region}
                      data={getRegionData(regionScores[region][column])}
                      style={{
                        stroke: theme.global.colors[highlightRegion],
                        strokeWidth: 2.5,
                      }}
                    />
                  ))}
              {mode === 'multi' &&
                regionScores &&
                highlightRegion &&
                Object.keys(regionScores)
                  .filter(r => r === highlightRegion)
                  .map(region => (
                    <MarkSeries
                      key={region}
                      data={getRegionYearData(
                        year,
                        regionScores[region][column],
                      )}
                      stroke={theme.global.colors[highlightRegion]}
                      fill={theme.global.colors[highlightRegion]}
                      size={4}
                    />
                  ))}
            </FlexibleWidthXYPlot>
            {(mode === 'multi' || mode === 'detail') && (
              <CardFooter
                regionScores={regionScores}
                year={year}
                column={column}
                unRegionFilterValue={unRegionFilterValue}
                regionTotals={unRegionTotals}
                isESR={metric.type === 'esr'}
                metric={metric}
                onSelectMetric={onSelectMetric}
              />
            )}
          </Card>
        );
      }}
    </ResponsiveContext.Consumer>
  );
}
ChartMetricTrend.propTypes = {
  theme: PropTypes.object,
  scores: PropTypes.object,
  unRegionTotals: PropTypes.object,
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  maxYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  minYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  maxValue: PropTypes.number,
  mode: PropTypes.string,
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onCountryClick: PropTypes.func,
  onSetRegionFilter: PropTypes.func,
  onSelectMetric: PropTypes.func,
  intl: intlShape.isRequired,
};

export default withTheme(injectIntl(ChartMetricTrend));
