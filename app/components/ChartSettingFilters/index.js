import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ResponsiveContext } from 'grommet';

import { isMinSize, isMaxSize } from 'utils/responsive';
import FilterOptions from './FilterOptions';
import FilterOptionsDrop from './FilterOptionsDrop';

const FilterWrap = styled.div``;

export function ChartSettingFilters({
  unRegionFilterValue,
  onRemoveFilter,
  onAddFilter,
  filterValues,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <FilterWrap>
          {isMinSize(size, 'large') && (
            <FilterOptions
              unRegionFilterValue={unRegionFilterValue}
              onRemoveFilter={onRemoveFilter}
              onAddFilter={onAddFilter}
              filterValues={filterValues}
            />
          )}
          {isMaxSize(size, 'medium') && (
            <FilterOptionsDrop
              unRegionFilterValue={unRegionFilterValue}
              onRemoveFilter={onRemoveFilter}
              onAddFilter={onAddFilter}
              filterValues={filterValues}
            />
          )}
        </FilterWrap>
      )}
    </ResponsiveContext.Consumer>
  );
}

ChartSettingFilters.propTypes = {
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onRemoveFilter: PropTypes.func,
  onAddFilter: PropTypes.func,
  filterValues: PropTypes.object,
};

export default ChartSettingFilters;
