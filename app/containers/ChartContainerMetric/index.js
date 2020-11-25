/**
 *
 * ChartContainerMetric
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Box, ResponsiveContext } from 'grommet';

import {
  getESRRightScores,
  getCPRRightScores,
  getBenchmarkSearch,
  getStandardSearch,
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
  COUNTRY_FILTERS,
} from 'containers/App/constants';

import LoadingIndicator from 'components/LoadingIndicator';
import ChartBars from 'components/ChartBars';
import ChartHeader from 'components/ChartHeader';
import Source from 'components/Source';
import CountryNotes from 'components/CountryNotes';
import CountryLabel from 'components/CountryLabel';

import Hint from 'styled/Hint';

import { sortScores } from 'utils/scores';
import { getFilterOptionValues, areAnyFiltersSet } from 'utils/filters';
import { isMinSize } from 'utils/responsive';
import { isCountryHighIncome, hasCountryGovRespondents } from 'utils/countries';

import rootMessages from 'messages';

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores'];

const getBand = score => ({
  lo: score && parseFloat(score[COLUMNS.CPR.LO]),
  hi: score && parseFloat(score[COLUMNS.CPR.HI]),
});

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
    let trend = '';

    if (s.rank && s.prevRank) {
      if (s.rank < s.prevRank) {
        trend = `+ (${s.prevRank})`;
      }
      if (s.rank > s.prevRank) {
        trend = `- (${s.prevRank})`;
      }
      if (s.rank === s.prevRank) {
        trend = `<> (${s.prevRank})`;
      }
    }
    return {
      value: s.value,
      rank: s.rank,
      prevRank: s.prevRank,
      trend,
      key: s.country_code,
      name,
      band: metric.type === 'cpr' && getBand(s),
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

export function ChartContainerMetric({
  onLoadData,
  metric,
  scores,
  benchmark,
  standard,
  unRegionFilterValue,
  onRemoveFilter,
  onAddFilter,
  sort,
  sortOrder,
  intl,
  onSortSelect,
  onOrderChange,
  countries,
  dataReady,
  onCountryClick,
  activeCode,
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

  const filterValues = getFilterOptionValues(
    countriesForScores,
    COUNTRY_FILTERS.SINGLE_METRIC,
    // check if any filters are already set -
    // if not we can just return all specified options
    areAnyFiltersSet(COUNTRY_FILTERS.SINGLE_METRIC, {
      unRegionFilterValue,
    }),
  );

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

  const hasResults = dataReady && (sorted && sorted.length > 0);
  const hasHICountries = countriesForScores.some(c => isCountryHighIncome(c));
  const hasGovRespondentsCountries = countriesForScores.some(c =>
    hasCountryGovRespondents(c),
  );
  // mark countries with symbol?
  const showHILabel =
    metric.type === 'esr' && metric.metricType !== 'indicators';
  const showGovRespondentsLabel = metric.type === 'cpr';

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box margin={{ bottom: 'xlarge' }}>
          <ChartHeader
            filter={{
              unRegionFilterValue,
              onRemoveFilter,
              onAddFilter,
              filterValues,
            }}
          />
          {!dataReady && <LoadingIndicator />}
          {!hasResults && dataReady && (
            <Hint italic>
              <FormattedMessage {...rootMessages.hints.noResults} />
            </Hint>
          )}
          {hasResults && sorted && sorted.length > 0 && (
            <ChartBars
              data={sorted}
              currentBenchmark={currentBenchmark}
              metric={metric}
              bullet={metric.type === 'cpr'}
              maxValue={metric.type === 'esr' ? 100 : 10}
              unit={metric.type === 'esr' ? '%' : null}
              stripes={metric.type === 'esr' && standard === 'hi'}
              sort={{
                sort: currentSort,
                order: currentSortOrder,
                onSortSelect,
                onOrderToggle: onOrderChange,
              }}
            />
          )}
          {hasResults && <Source />}
          <CountryNotes
            hasAside={isMinSize(size, 'large')}
            settingHint
            notes={{
              govRespondents:
                showGovRespondentsLabel && hasGovRespondentsCountries,
              hiCountries: showHILabel && hasHICountries,
            }}
          />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}
// metric={metric}
// currentBenchmark={currentBenchmark}
// standard={standard}

ChartContainerMetric.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  metric: PropTypes.object.isRequired,
  standard: PropTypes.string,
  benchmark: PropTypes.string,
  activeCode: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onAddFilter: PropTypes.func,
  onRemoveFilter: PropTypes.func,
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  intl: intlShape.isRequired,
  sort: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sortOrder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onSortSelect: PropTypes.func,
  onOrderChange: PropTypes.func,
  dataReady: PropTypes.bool,
  showHILabel: PropTypes.bool,
  onCountryClick: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  scores: (state, { metric }) =>
    metric.type === 'esr'
      ? getESRRightScores(state, metric.key)
      : getCPRRightScores(state, metric.key),
  countries: state => getCountries(state),
  benchmark: state => getBenchmarkSearch(state),
  standard: state => getStandardSearch(state),
  unRegionFilterValue: state => getUNRegionSearch(state),
  sort: state => getSortSearch(state),
  sortOrder: state => getSortOrderSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
    onRemoveFilter: (key, value) =>
      dispatch(
        navigate(
          {},
          {
            replace: false,
            deleteParams: [
              {
                key,
                value,
              },
            ],
            trackEvent: {
              category: 'Data',
              action: 'Remove country filter (Metric)',
              value: key,
            },
          },
        ),
      ),
    onAddFilter: (key, value) =>
      dispatch(
        navigate(
          { search: `?${key}=${value}` },
          {
            replace: false,
            multiple: true,
            trackEvent: {
              category: 'Data',
              action: 'Country filter (Metric)',
              value: `${key}/${value}`,
            },
          },
        ),
      ),
    onSortSelect: value =>
      dispatch(
        navigate(
          { search: `?sort=${value}` },
          {
            replace: false,
            trackEvent: {
              category: 'Data',
              action: 'Sort countries (Metric)',
              value,
            },
          },
        ),
      ),
    onOrderChange: value =>
      dispatch(
        navigate(
          { search: `?dir=${value}` },
          {
            replace: false,
            trackEvent: {
              category: 'Data',
              action: 'Country sort order (Metric)',
              value,
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

export default compose(withConnect)(injectIntl(ChartContainerMetric));
