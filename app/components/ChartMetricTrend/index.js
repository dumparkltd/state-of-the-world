/**
 *
 * ChartMetricTrend
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { ResponsiveContext, Box, Text } from 'grommet';

import { isMinSize } from 'utils/responsive';
import { getXTime, getTickValuesY, getTickValuesX } from 'utils/charts';

import { COLUMNS } from 'containers/App/constants';

import rootMessages from 'messages';

import Card from './Card';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';
import ScoreSheet from './ScoreSheet';
import PlotDetailRegion from './PlotDetailRegion';
import PlotMultiRegion from './PlotMultiRegion';
import PlotMultiCountry from './PlotMultiCountry';

// const isEven = n => n % 2 === 0;
// const isOdd = n => Math.abs(n % 2) === 1;

function ChartMetricTrend({
  scores,
  maxYear,
  minYear,
  maxValue = 100,
  minValue = 0,
  benchmark,
  metric,
  mode,
  currentRegion,
  onCountryClick,
  onSetRegionFilter,
  onSelectMetric,
  onSelectPage,
  unRegionTotals,
}) {
  const [highlightYear, setYear] = useState(false);
  const [highlightCountry, setCountry] = useState(false);
  const [highlightRegion, setRegion] = useState(false);

  // console.log('ChartMetricTrend', maxYear, scores);
  if (!maxYear || !scores) return null;
  let column;
  if (metric.type === 'esr') column = benchmark;
  if (metric.type === 'cpr') column = COLUMNS.CPR.MEAN;
  if (metric.type === 'vdem') column = COLUMNS.VDEM.MEAN;

  // dummy data to force the area plot from 0
  // with some horizontal padding, hard-coded
  const dataForceYRange = [
    { x: getXTime(minYear), y: minValue },
    { x: getXTime(maxYear), y: maxValue },
  ];
  const tickValuesY = getTickValuesY(metric.type, mode);
  const regionScores = scores.regions;
  const countriesScores = scores.countries;
  const year = highlightYear || maxYear;

  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => {
        let h = mode === 'detail-region' ? 200 : 120;
        if (isMinSize(size, 'medium')) {
          h = mode === 'detail-region' ? 280 : 120;
        }
        const tickValuesX = getTickValuesX(
          size,
          mode,
          parseInt(minYear, 10),
          parseInt(maxYear, 10),
        );
        return (
          <Card
            padRight={mode === 'detail-region'}
            onMouseLeave={() => {
              setYear(false);
            }}
          >
            {mode === 'detail-region' && (
              <Box margin={{ vertical: 'small' }}>
                <Text size="large" weight={700}>
                  <FormattedMessage
                    {...rootMessages.rights[metric.key]}
                  />
                </Text>
              </Box>
            )}
            {(mode === 'multi-region' || mode === 'multi-country') && (
              <CardHeader
                onSelectMetric={onSelectMetric}
                regionScores={regionScores}
                year={year}
                column={column}
                metric={metric}
                currentRegion={
                  currentRegion === 'all' ? 'world' : (currentRegion || 'world')
                }
                mode={mode}
              />
            )}
            {mode === 'detail-region' && (
              <Box direction="row">
                <Box fill="horizontal">
                  <PlotDetailRegion
                    height={h}
                    highlightCountry={highlightCountry}
                    highlightRegion={highlightRegion}
                    countriesScores={countriesScores}
                    regionScores={regionScores}
                    year={year}
                    column={column}
                    metric={metric}
                    currentRegion={currentRegion}
                    onSetRegionFilter={onSetRegionFilter}
                    onCountryClick={onCountryClick}
                    setYear={setYear}
                    setCountry={setCountry}
                    setRegion={setRegion}
                    tickValuesX={tickValuesX}
                    tickValuesY={tickValuesY}
                    dataForceYRange={dataForceYRange}
                  />
                </Box>
                <ScoreSheet
                  height={h}
                  margin={{ bottom: 20, top: 10 }}
                  highlightCountry={highlightCountry}
                  highlightRegion={highlightRegion}
                  countriesScores={countriesScores}
                  regionScores={regionScores}
                  year={year}
                  column={column}
                  metric={metric}
                  maxValue={maxValue}
                  minValue={minValue}
                  maxYear={maxYear}
                  currentRegion={currentRegion}
                  onSetRegionFilter={onSetRegionFilter}
                  setRegion={setRegion}
                />
              </Box>
            )}
            {mode === 'multi-region' && (
              <Box pad={{ horizontal: 'ml', vertical: 'small' }}>
                <PlotMultiRegion
                  height={h}
                  highlightRegion={highlightRegion}
                  regionScores={regionScores}
                  year={year}
                  column={column}
                  metric={metric}
                  currentRegion={currentRegion === 'all' ? 'world' : currentRegion}
                  onSetRegionFilter={onSetRegionFilter}
                  setYear={setYear}
                  setRegion={setRegion}
                  tickValuesX={tickValuesX}
                  tickValuesY={tickValuesY}
                  dataForceYRange={dataForceYRange}
                />
              </Box>
            )}
            {mode === 'multi-country' && (
              <PlotMultiCountry
                height={h}
                highlightRegion={highlightRegion}
                countryScores={scores.country}
                regionScores={regionScores}
                year={year}
                column={column}
                metric={metric}
                currentRegion={currentRegion || 'world'}
                setYear={setYear}
                tickValuesX={tickValuesX}
                tickValuesY={tickValuesY}
                dataForceYRange={dataForceYRange}
              />
            )}
            <CardFooter
              mode={mode}
              regionScores={regionScores}
              countryScores={scores.country}
              year={year}
              column={column}
              currentRegion={currentRegion || 'world'}
              regionTotals={unRegionTotals}
              type={metric.type}
              onSelectMetric={onSelectMetric}
              onSelectPage={onSelectPage}
            />
          </Card>
        );
      }}
    </ResponsiveContext.Consumer>
  );
}
ChartMetricTrend.propTypes = {
  scores: PropTypes.object,
  unRegionTotals: PropTypes.object,
  metric: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  maxYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  minYear: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  mode: PropTypes.string,
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  currentRegion: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onCountryClick: PropTypes.func,
  onSetRegionFilter: PropTypes.func,
  onSelectMetric: PropTypes.func,
  onSelectPage: PropTypes.func,
};

export default ChartMetricTrend;
