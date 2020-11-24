/**
 *
 * ChartContainerCountrySnapshot
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { injectIntl, intlShape } from 'react-intl';
// import { Paragraph, Box, Heading } from 'grommet';
// import styled from 'styled-components';

// import { COLUMNS, BENCHMARKS, STANDARDS } from 'containers/App/constants';
import {
  getStandardSearch,
  getBenchmarkSearch,
  getRightsForCountry,
  getDependenciesReady,
  getESRYear,
  getCPRYear,
  getCountry,
  getCountryGrammar,
  getLocale,
} from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';
import LoadingIndicator from 'components/LoadingIndicator';

const DEPENDENCIES = [
  'countries',
  'countriesGrammar',
  'cprScores',
  'esrScores',
];

export function ChartContainerCountrySnapshot({ onLoadData, dataReady }) {
  useEffect(() => {
    onLoadData();
  }, []);
  if (!dataReady) return <LoadingIndicator />;

  return null;
}

ChartContainerCountrySnapshot.propTypes = {
  onLoadData: PropTypes.func.isRequired,
  dataReady: PropTypes.bool,
};
const mapStateToProps = createStructuredSelector({
  country: (state, { countryCode }) => getCountry(state, countryCode),
  countryGrammar: (state, { countryCode }) =>
    getCountryGrammar(state, countryCode),
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  standard: (state, { countryCode }) => getStandardSearch(state, countryCode),
  benchmark: state => getBenchmarkSearch(state),
  rights: (state, { countryCode }) => getRightsForCountry(state, countryCode),
  esrYear: state => getESRYear(state),
  cprYear: state => getCPRYear(state),
  locale: state => getLocale(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ChartContainerCountrySnapshot);
