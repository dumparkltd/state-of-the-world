/**
 *
 * ChartMetricRegionTrend
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import { ResponsiveContext, Text, Box } from 'grommet';
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
import { formatScoreMax } from 'utils/scores';

import Card from 'styled/Card';
import ButtonPlain from 'styled/ButtonPlain';

import rootMessages from 'messages';

import ScoreSheet from './ScoreSheet';

const ButtonTitle = styled(ButtonPlain)`
  color: ${({ color, theme }) => theme.global.colors[color]};
  &:hover {
    color: ${({ color, theme }) => theme.global.colors[color]};
    text-decoration: underline;
  }
`;
const CardHeader = styled.div`
  margin-bottom: 10px;
`;

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

// const isEven = n => n % 2 === 0;
// const isOdd = n => Math.abs(n % 2) === 1;

const getTickValuesX = (size, mode, minYear, maxYear) => {
  if (mode === 'multi' || isMaxSize(size, 'sm')) {
    return [new Date(`${minYear}`), new Date(`${maxYear}`)];
  }
  const tickValuesX = [];
  /* eslint-disable no-plusplus */
  for (let y = minYear; y <= maxYear; y++) {
    tickValuesX.push(new Date(`${y}`).getTime());
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
      count: parseFloat(regionColumnScores[year].count),
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

const sortRegions = (regionA, regionB, priorityRegion) => {
  if (regionA === priorityRegion) return 1;
  if (regionB === priorityRegion) return -1;
  return 1;
};

const getRegionYearScore = (year, scores, type, intl) => {
  const data = getRegionYearData(year, scores);
  if (data.length > 0) {
    return formatScoreMax(
      data[0].y,
      type === 'esr' ? 100 : 10,
      1,
      false,
      // type !== 'esr',
      intl,
    );
  }
  return 'N/A';
};
const getRegionYearCount = (year, scores) => {
  const data = getRegionYearData(year, scores);
  return data.length > 0 ? data[0].count : 0;
};

const getTickValuesY = (type, mode) => {
  if (mode === 'detail') {
    return type === 'esr' ? [0, 20, 40, 60, 80, 100] : [0, 2, 4, 6, 8, 10];
  }
  return type === 'esr' ? [0, 50, 100] : [0, 5, 10];
};

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
  onSetRegionFilter,
  onSelectMetric,
  intl,
}) {
  const [highlightYear, setYear] = useState(false);
  const [highlightCountry, setCountry] = useState(false);
  const [highlightRegion, setRegion] = useState(false);
  if (!maxYear) return null;
  const column = metric.type === 'cpr' ? 'mean' : benchmark;

  // dummy data to force the area plot from 0
  // with some horizontal padding, hard-coded
  const dataForceYRange = [
    { x: new Date(minYear).getTime() - 15000000000, y: 0 },
    { x: new Date(maxYear).getTime() + 15000000000, y: maxValue },
  ];
  const tickValuesY = getTickValuesY(metric.type, mode);
  const regionScores = scores.regions;
  const countryScores = scores.countries;
  const year = highlightYear || maxYear;
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => {
        let h = mode === 'detail' ? 200 : 130;
        if (isMinSize(size, 'medium')) {
          h = mode === 'detail' ? 280 : 140;
        }
        return (
          <Card mode={mode}>
            {mode === 'multi' && unRegionFilterValue && (
              <CardHeader>
                <Box fill direction="row" justify="between" gap="small" align="center">
                  <Box>
                    <ButtonTitle color={unRegionFilterValue} onClick={() => onSelectMetric()}>
                      <Text weight={600} color={unRegionFilterValue}>
                        <FormattedMessage {...rootMessages['rights-short'][metric.key]} />
                      </Text>
                    </ButtonTitle>
                  </Box>
                  <Box flex={{ shrink: 0 }}>
                    <Box direction="row" gap="xsmall" justify="between">
                      <Text size="small">
                        <FormattedMessage {...rootMessages.labels.regionScore} />
                      </Text>
                      <Text
                        size="small"
                        weight={600}
                        color={unRegionFilterValue}
                      >
                        {
                          getRegionYearScore(
                            year,
                            regionScores[unRegionFilterValue][column],
                            metric.type,
                            intl,
                          )
                        }
                      </Text>
                    </Box>
                    <Box direction="row" gap="xsmall" justify="between">
                      <Text size="small">
                        <FormattedMessage {...rootMessages.labels.countryNo} />
                      </Text>
                      <Text size="small" color={unRegionFilterValue}>
                        {
                          getRegionYearCount(
                            year,
                            regionScores[unRegionFilterValue][column],
                          )
                        }
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </CardHeader>
            )}
            {mode === 'detail' && (
              <ScoreSheet
                height={h}
                margin={{ bottom: 30, top: 10 }}
                regionScores={regionScores}
                countryScores={countryScores}
                year={year}
                highlightCountry={highlightCountry}
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
                setYear(false);
              }}
              onClick={() => {
                if (mode === 'detail' && highlightCountry) {
                  onCountryClick(highlightCountry)
                }
                if (mode === 'detail' && !highlightCountry) {
                  onCountryClick()
                }
                if (mode === 'multi' && highlightRegion) {
                  onSetRegionFilter(highlightRegion)
                }
                if (mode === 'multi' && !highlightRegion) {
                  onSetRegionFilter()
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
                  mode,
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
                Object.keys(regionScores)
                  .sort((a, b) => sortRegions(
                    a,
                    b,
                    unRegionFilterValue,
                    highlightRegion,
                  ))
                  .map(region => {
                    let color = 'grey';
                    let strokeWidth = 1;
                    if (mode === 'detail') {
                      color = theme.global.colors[region]
                      strokeWidth = 2.5;
                    } else if (mode === 'multi' && region === unRegionFilterValue) {
                      color = theme.global.colors[region]
                      strokeWidth = 2.5;
                    }
                    return (
                      <LineSeries
                        key={region}
                        data={getRegionData(
                          regionScores[region][column],
                        )}
                        style={{
                          stroke: color,
                          strokeWidth,
                        }}
                        onNearestX={point => {
                          setYear(point.syear)
                        }}
                        onSeriesMouseOver={() => {
                          setRegion(region)
                        }}
                      />
                    );
                  })}
              {regionScores &&
                Object.keys(regionScores)
                  .filter(
                    region => mode !== 'multi' ||
                    region === unRegionFilterValue ||
                    region === highlightRegion
                  )
                  .map(region => {
                    let color = 'grey';
                    let msize = 3;
                    if (mode === 'detail') {
                      color = theme.global.colors[region]
                      msize = 4;
                    } else if (mode === 'multi' && region === unRegionFilterValue) {
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
              {countryScores && highlightCountry && unRegionFilterValue &&
                Object.keys(countryScores)
                  .filter(c => c === highlightCountry)
                  .map(country => (
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
                Object.keys(countryScores)
                  .filter(c => c === highlightCountry)
                  .map(country => (
                    <MarkSeries
                      key={country}
                      data={getCountryYearData(
                        year,
                        countryScores[country][column],
                      )}
                      stroke={theme.global.colors[unRegionFilterValue]}
                      fill={theme.global.colors[unRegionFilterValue]}
                      size={3}
                    />
                  ))}
              {regionScores && highlightRegion &&
                Object.keys(regionScores)
                  .filter(r => r === highlightRegion)
                  .map(region => (
                    <LineSeries
                      key={region}
                      data={getRegionData(
                        regionScores[region][column],
                      )}
                      style={{
                        stroke: theme.global.colors[highlightRegion],
                        strokeWidth: 2.5,
                      }}
                    />
                  ))}
              {regionScores && highlightRegion &&
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
          </Card>
        );
      }}
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
  intl: intlShape.isRequired,
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onCountryClick: PropTypes.func,
  onSetRegionFilter: PropTypes.func,
  onSelectMetric: PropTypes.func,
};

export default withTheme(injectIntl(ChartMetricRegionTrend));
