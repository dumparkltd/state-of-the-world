/**
 *
 * ChartHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext, Box } from 'grommet';
import styled from 'styled-components';

import ChartSettingFilters from 'components/ChartSettingFilters';
import Settings from 'containers/Settings';

import { isMinSize, isMaxSize } from 'utils/responsive';

const Styled = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin-top: ${({ top }) => (top ? 20 : 30)}px;
    margin-bottom: 20px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    margin-top: ${({ top }) => (top ? 20 : 60)}px;
  }
`;

export function ChartHeader({ filter, top, settings }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled top={top}>
          {filter && (
            <Box
              direction={isMaxSize(size, 'sm') ? 'column' : 'row'}
              justify="between"
              align={isMinSize(size, 'medium') ? 'center' : 'start'}
              margin={{
                bottom: isMinSize(size, 'medium') ? '0' : 'small',
                top: isMinSize(size, 'medium') ? 'small' : '0',
              }}
            >
              <ChartSettingFilters
                unRegionFilterValue={filter.unRegionFilterValue}
                onRemoveFilter={filter.onRemoveFilter}
                onAddFilter={filter.onAddFilter}
                filterValues={filter.filterValues}
              />
            </Box>
          )}
          {settings && settings.standard && <Settings showStandard />}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

ChartHeader.propTypes = {
  filter: PropTypes.object,
  settings: PropTypes.object,
  top: PropTypes.bool,
};

export default ChartHeader;
