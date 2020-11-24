import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Box, Drop, ResponsiveContext, Layer } from 'grommet';
import { Close, FormDown } from 'grommet-icons';

import { INCOME_GROUPS } from 'containers/App/constants';

import ButtonIcon from 'styled/ButtonIcon';

import rootMessages from 'messages';
import { isMinSize, isMaxSize } from 'utils/responsive';
import FilterOptions from './FilterOptions';
import FilterDropButton from './FilterDropButton';
import ActiveFilterButton from './ActiveFilterButton';
import messages from './messages';

const StyledButtonIcon = styled(ButtonIcon)`
  position: absolute;
  top: 6px;
  right: 16px;
`;

const FilterWrap = styled.div``;

const getFilterOptions = ({ unregion, income }, intl, filterValues) => {
  let groups = [];
  if (!unregion && filterValues.unregion) {
    groups = [
      ...groups,
      {
        group: 'regions',
        label: intl.formatMessage(messages.regionsFilterOptionGroup),
        options: filterValues.unregion
          .filter(value => !unregion || unregion.indexOf(value) === -1)
          .map(value => ({
            key: 'unregion',
            value,
            label: intl.formatMessage(rootMessages.un_regions[value]),
          })),
      },
    ];
  }
  if ((!income || INCOME_GROUPS.multiple) && filterValues.income) {
    groups = [
      ...groups,
      {
        group: 'income',
        label: intl.formatMessage(messages.incomeFilterOptionGroup),
        options: filterValues.income
          .filter(value => !income || income.indexOf(value) === -1)
          .map(value => ({
            key: 'income',
            value,
            label: intl.formatMessage(rootMessages.income[value]),
          })),
      },
    ];
  }
  return groups;
};

const renderContent = (filterOptions, setFilterOpen, onAddFilter) => (
  <Box width={{ min: '280px' }} overflow="auto">
    <StyledButtonIcon subtle onClick={() => setFilterOpen(false)}>
      <Close size="large" color="dark" />
    </StyledButtonIcon>
    <FilterOptions
      optionGroups={filterOptions.filter(g => g.options.length > 0)}
      onSelect={({ key, value }) => {
        setFilterOpen(false);
        onAddFilter(key, value);
      }}
    />
  </Box>
);

export function ChartSettingFilters({
  unRegionFilterValue,
  // regionFilterValue,
  // subregionFilterValue,
  onRemoveFilter,
  onAddFilter,
  incomeFilterValue,
  intl,
  filterValues,
  hasWhiteBG,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const countryTarget = useRef(null);
  const setFilters = {
    unregion: filterValues.unregion && unRegionFilterValue,
    // region: filterValues.region && regionFilterValue,
    // subregion: filterValues.subregion && subregionFilterValue,
    income: filterValues.income && incomeFilterValue,
  };
  const setAllFilters = Object.keys(filterValues).reduce(
    (memo, key) => memo && setFilters[key],
    true,
  );
  const optionGroups = getFilterOptions(
    {
      unregion: unRegionFilterValue,
      // region: regionFilterValue,
      // subregion: subregionFilterValue,
      income: incomeFilterValue,
    },
    intl,
    filterValues,
  );
  const hasOptions = optionGroups.reduce(
    (memo, g) => memo || g.options.length > 0,
    false,
  );
  // {setFilters.subregion &&
  //   setFilters.subregion.map(value => (
  //     <ActiveFilterButton
  //       key={value}
  //       onRemove={() => onRemoveFilter('subregion', value)}
  //       label={intl.formatMessage(rootMessages.subregions[value])}
  //     />
  //   ))}
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <FilterWrap>
          {setFilters.unregion &&
            setFilters.unregion.map(value => (
              <ActiveFilterButton
                key={value}
                onRemove={() => onRemoveFilter('unregion', value)}
                label={intl.formatMessage(rootMessages.un_regions[value])}
              />
            ))}
          {setFilters.income &&
            setFilters.income.map(value => (
              <ActiveFilterButton
                key={value}
                onRemove={() => onRemoveFilter('income', value)}
                label={intl.formatMessage(rootMessages.income[value])}
              />
            ))}
          {!setAllFilters && hasOptions && (
            <>
              <FilterDropButton
                active={filterOpen}
                onClick={() => {
                  setFilterOpen(!filterOpen);
                }}
                ref={countryTarget}
                hasWhiteBG={hasWhiteBG}
              >
                {isMinSize(size, 'large') && (
                  <Box direction="row" align="center" gap="xsmall">
                    <FormattedMessage {...messages.addFilter} />
                    <FormDown color="dark" size="xlarge" />
                  </Box>
                )}
                {isMaxSize(size, 'medium') && (
                  <FormattedMessage {...messages.addFilterMobile} />
                )}
              </FilterDropButton>
              {isMinSize(size, 'large') && filterOpen && (
                <Drop
                  align={{ top: 'top', left: 'left' }}
                  target={countryTarget.current}
                  onClickOutside={() => setFilterOpen(false)}
                >
                  {renderContent(optionGroups, setFilterOpen, onAddFilter)}
                </Drop>
              )}
              {isMaxSize(size, 'medium') && filterOpen && (
                <Layer full animate={false}>
                  {renderContent(optionGroups, setFilterOpen, onAddFilter)}
                </Layer>
              )}
            </>
          )}
        </FilterWrap>
      )}
    </ResponsiveContext.Consumer>
  );
}

ChartSettingFilters.propTypes = {
  intl: intlShape.isRequired,
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  // regionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  // subregionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  incomeFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onRemoveFilter: PropTypes.func,
  onAddFilter: PropTypes.func,
  filterValues: PropTypes.object,
  hasWhiteBG: PropTypes.bool,
};

export default injectIntl(ChartSettingFilters);
