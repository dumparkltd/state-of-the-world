import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Box, Layer } from 'grommet';
import { Close } from 'grommet-icons';

import ButtonIcon from 'styled/ButtonIcon';

import rootMessages from 'messages';
import messages from './messages';
import FilterDropOptions from './FilterDropOptions';
import FilterDropButton from './FilterDropButton';
import ActiveFilterButton from './ActiveFilterButton';

const StyledButtonIcon = styled(ButtonIcon)`
  position: absolute;
  top: 6px;
  right: 16px;
`;

const getFilterOptions = ({ unregion }, intl, filterValues) => {
  let groups = [];
  if (!unregion && filterValues.unregion) {
    groups = [
      ...groups,
      {
        group: 'regions',
        label: intl.formatMessage(messages.regionsFilterOptionGroup),
        options: filterValues.unregion
          .filter(option => !option.default)
          .map(option => ({
            key: 'unregion',
            value: option.key,
            label: intl.formatMessage(rootMessages.un_regions[option.key]),
          })),
      },
    ];
  }
  return groups;
};

export function FilterOptionsDrop({
  unRegionFilterValue,
  onRemoveFilter,
  onAddFilter,
  filterValues,
  intl,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const countryTarget = useRef(null);
  const setFilters = {
    unregion: filterValues.unregion && unRegionFilterValue,
  };
  const setAllFilters = Object.keys(filterValues).reduce(
    (memo, key) => memo && setFilters[key],
    true,
  );
  const optionGroups = getFilterOptions(
    {
      unregion: unRegionFilterValue,
    },
    intl,
    filterValues,
  );
  const hasOptions = optionGroups.reduce(
    (memo, g) => memo || g.options.length > 0,
    false,
  );

  return (
    <>
      {setFilters.unregion && (
        <ActiveFilterButton
          onClick={() => onRemoveFilter({ key: 'unregion' })}
          label={intl.formatMessage(
            rootMessages.un_regions[unRegionFilterValue],
          )}
        />
      )}
      {!setAllFilters && hasOptions && (
        <>
          <FilterDropButton
            active={filterOpen}
            onClick={() => {
              setFilterOpen(!filterOpen);
            }}
            ref={countryTarget}
          >
            <FormattedMessage {...messages.addFilterMobile} />
          </FilterDropButton>
          {filterOpen && (
            <Layer full animate={false}>
              <Box width={{ min: '280px' }} overflow="auto">
                <StyledButtonIcon subtle onClick={() => setFilterOpen(false)}>
                  <Close size="large" color="dark" />
                </StyledButtonIcon>
                <FilterDropOptions
                  optionGroups={optionGroups.filter(g => g.options.length > 0)}
                  onSelect={option => {
                    setFilterOpen(false);
                    onAddFilter(option);
                  }}
                />
              </Box>
            </Layer>
          )}
        </>
      )}
    </>
  );
}

FilterOptionsDrop.propTypes = {
  intl: intlShape.isRequired,
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onRemoveFilter: PropTypes.func,
  onAddFilter: PropTypes.func,
  filterValues: PropTypes.object,
};

export default injectIntl(FilterOptionsDrop);
