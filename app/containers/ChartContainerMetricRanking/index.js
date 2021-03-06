/**
 *
 * ChartContainerMetricRanking
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Box, ResponsiveContext } from 'grommet';

import {
  getESRRightScores,
  getCPRRightScores,
  getVDEMRightScores,
  getBenchmarkSearch,
  getUNRegionSearch,
  getSortSearch,
  getSortOrderSearch,
  getCountries,
  getDependenciesReady,
} from 'containers/App/selectors';
import { loadDataIfNeeded, navigate } from 'containers/App/actions';
import {
  BENCHMARKS,
  COLUMNS,
  COUNTRY_SORTS,
  TREND_THRESHOLDS,
} from 'containers/App/constants';

import ChartBars from 'components/ChartBars';
import ChartHeader from 'components/ChartHeader';
import Source from 'components/Source';
import CountryNotes from 'components/CountryNotes';
import CountryLabel from 'components/CountryLabel';
import ContentTitle from 'styled/ContentTitle';

import { sortScores } from 'utils/scores';
import { isMinSize } from 'utils/responsive';
import { isCountryHighIncome, hasCountryGovRespondents } from 'utils/countries';
import { lowerCase } from 'utils/string';

import rootMessages from 'messages';
import messages from './messages';

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores', 'vdemScores'];

const getBand = (score, type) => {
  if (type === 'cpr') {
    return {
      lo: score && parseFloat(score[COLUMNS.CPR.LO]),
      hi: score && parseFloat(score[COLUMNS.CPR.HI]),
    };
  }
  if (type === 'vdem') {
    return {
      lo: score && parseFloat(score[COLUMNS.VDEM.LO]),
      hi: score && parseFloat(score[COLUMNS.VDEM.HI]),
    };
  }
  return null;
};

const prepareData = ({
  scores,
  metric,
  countries,
  onCountryClick,
  activeCode,
  showHILabel,
  showGovRespondentsLabel,
  intl,
}) =>
  scores.map(s => {
    const country = countries.find(c => c.country_code === s.country_code);
    let name = '';
    if (rootMessages.countries[country[COLUMNS.COUNTRIES.CODE]]) {
      name = intl.formatMessage(
        rootMessages.countries[country[COLUMNS.COUNTRIES.CODE]],
      );
    } else {
      console.log(
        'Country code not in language files:',
        country[COLUMNS.COUNTRIES.CODE],
      );
      name = country[COLUMNS.COUNTRIES.CODE];
    }
    let trend;

    if (s.value && s.prevValue) {
      const threshold =
        metric.type === 'cpr' ? TREND_THRESHOLDS.CPR : TREND_THRESHOLDS.ESR;
      if (s.value > s.prevValue + threshold) {
        trend = 'up';
      }
      if (s.value < s.prevValue - threshold) {
        trend = 'down';
      }
    }
    return {
      value: s.value,
      rank: s.rank,
      // prevRank: s.prevRank,
      trend,
      key: s.country_code,
      name,
      band: getBand(s, metric.type),
      label: (
        <CountryLabel
          name={name}
          country={country}
          showGovRespondentsLabel={showGovRespondentsLabel}
          showHILabel={showHILabel}
        />
      ),
      onClick: () => onCountryClick(s.country_code),
      active: activeCode === s.country_code,
    };
  });

// const rankScores

export function ChartContainerMetricRanking({
  onLoadData,
  metric,
  scores,
  benchmark,
  sort,
  sortOrder,
  intl,
  onSortSelect,
  onOrderChange,
  countries,
  dataReady,
  onCountryClick,
  activeCode,
  unRegionFilterValue,
}) {
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);

  const currentSort = sort && COUNTRY_SORTS[sort] ? sort : 'score';
  const currentSortOrder = sortOrder || COUNTRY_SORTS[currentSort].order;

  // prettier-ignore
  const countriesForScores = scores
    ? scores.map(s =>
      countries.find(c => c.country_code === s.country_code),
    )
    : [];
  // mark countries with symbol?
  const showHILabel = metric.type === 'esr';
  const showGovRespondentsLabel = metric.type === 'cpr';
  // extract value, name and more
  const data =
    scores &&
    prepareData({
      scores,
      metric,
      countries,
      onCountryClick,
      activeCode,
      showHILabel,
      showGovRespondentsLabel,
      intl,
    });

  // sort again by custom sort option
  // prettier-ignore
  const sorted =
    scores &&
    sortScores({
      data,
      sort: currentSort,
      order: currentSortOrder,
    });

  const hasHICountries = countriesForScores.some(c => isCountryHighIncome(c));
  const hasGovRespondentsCountries = countriesForScores.some(c =>
    hasCountryGovRespondents(c),
  );

  const currentRegion =
    unRegionFilterValue === 'all' ? 'world' : unRegionFilterValue;
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box margin={{ bottom: 'xlarge' }}>
          <Box margin={{ top: 'medium' }} direction="row" justif="between">
            <ContentTitle>
              <FormattedMessage
                {...messages.title}
                values={{
                  metric: lowerCase(
                    intl.formatMessage(rootMessages.rights[metric.key]),
                  ),
                }}
              />
            </ContentTitle>
          </Box>
          <ChartHeader
            filters={[
              {
                attribute: 'unregion',
                type: 'filter',
              },
            ]}
            settings={
              metric.type === 'esr'
                ? [
                  {
                    attribute: 'standard',
                  },
                ]
                : []
            }
            year
            metricType={metric.type}
          />
          <ChartBars
            data={sorted}
            dataReady={dataReady}
            currentBenchmark={currentBenchmark}
            metric={metric}
            color={currentRegion}
            sort={{
              sort: currentSort,
              order: currentSortOrder,
              onSortSelect,
              onOrderToggle: () =>
                onOrderChange(currentSortOrder === 'asc' ? 'desc' : 'asc'),
            }}
          />
          <Box margin={{ top: 'small' }}>
            <Source type={metric.type} />
          </Box>
          <CountryNotes
            hasAside={isMinSize(size, 'large')}
            settingHint
            notes={{
              govRespondents:
                showGovRespondentsLabel && hasGovRespondentsCountries,
              hiCountries: showHILabel && hasHICountries,
              trendCPR: isMinSize(size, 'medium') && metric.type === 'cpr',
              trendESR: isMinSize(size, 'medium') && metric.type === 'esr',
              trendVDEM: isMinSize(size, 'medium') && metric.type === 'vdem',
            }}
          />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

ChartContainerMetricRanking.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  metric: PropTypes.object.isRequired,
  benchmark: PropTypes.string,
  activeCode: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  intl: intlShape.isRequired,
  sort: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sortOrder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onSortSelect: PropTypes.func,
  onOrderChange: PropTypes.func,
  dataReady: PropTypes.bool,
  showHILabel: PropTypes.bool,
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onCountryClick: PropTypes.func,
  yesr: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  ycpr: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  yesrRange: PropTypes.object,
  ycprRange: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  scores: (state, { metric }) => {
    if (metric.type === 'esr') {
      return getESRRightScores(state, metric.key);
    }
    if (metric.type === 'cpr') {
      return getCPRRightScores(state, metric.key);
    }
    if (metric.type === 'vdem') {
      return getVDEMRightScores(state, metric.key);
    }
    return false;
  },
  countries: state => getCountries(state),
  benchmark: state => getBenchmarkSearch(state),
  unRegionFilterValue: state => getUNRegionSearch(state),
  sort: state => getSortSearch(state),
  sortOrder: state => getSortOrderSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
    onSortSelect: (value, dir) =>
      dispatch(
        navigate(
          { search: dir ? `?sort=${value}&dir=${dir}` : `?sort=${value}` },
          {
            replace: false,
            trackEvent: {
              category: 'Data',
              action: 'Sort countries (Metric)',
              value,
              dir,
            },
          },
        ),
      ),
    onOrderChange: dir =>
      dispatch(
        navigate(
          { search: `?dir=${dir}` },
          {
            replace: false,
            trackEvent: {
              category: 'Data',
              action: 'Country sort order (Metric)',
              value: dir,
            },
          },
        ),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(ChartContainerMetricRanking));
