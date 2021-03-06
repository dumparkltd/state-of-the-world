import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styled from 'styled-components';

import { getUNRegionSearch } from 'containers/App/selectors';
import { navigate } from 'containers/App/actions';

import { COUNTRY_FILTERS } from 'containers/App/constants';
import { getFilterOptionValues } from 'utils/filters';
import FilterOptions from './FilterOptions';

const FilterWrap = styled.div``;

export function ChartFilters({
  unRegionFilterValue,
  onRemoveFilter,
  onAddFilter,
  config,
}) {
  const filterValues = getFilterOptionValues(
    COUNTRY_FILTERS.SINGLE_METRIC,
    config,
  );
  return (
    <FilterWrap>
      <FilterOptions
        unRegionFilterValue={unRegionFilterValue}
        onRemoveFilter={onRemoveFilter}
        onAddFilter={onAddFilter}
        filterValues={filterValues}
        config={config}
      />
    </FilterWrap>
  );
}

ChartFilters.propTypes = {
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onRemoveFilter: PropTypes.func,
  onAddFilter: PropTypes.func,
  config: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  unRegionFilterValue: state => getUNRegionSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onRemoveFilter: ({ key, value }) =>
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
    onAddFilter: ({ key, value }) =>
      dispatch(
        navigate(
          { search: `?${key}=${value}` },
          {
            replace: false,
            trackEvent: {
              category: 'Data',
              action: 'Country filter (Metric)',
              value: `${key}/${value}`,
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

export default compose(withConnect)(ChartFilters);
