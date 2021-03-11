/**
 *
 * ChartHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

import ChartFilters from 'containers/ChartFilters';
import ChartSettings from 'containers/ChartSettings';
import ChartYearSelect from 'containers/ChartYearSelect';

const Styled = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;
// @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
//   margin-top: ${({ top }) => (top ? 20 : 30)}px;
//   margin-bottom: 20px;
// }
// @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
//   margin-top: ${({ top }) => (top ? 20 : 60)}px;
// }

export function ChartHeader({ filters, settings, year, metricType }) {
  return (
    <Styled top>
      {filters && <ChartFilters filters={filters} />}
      {(settings || (year && metricType)) && (
        <Box direction="row" justify="between">
          {settings && settings.standard && <ChartSettings showStandard />}
          {(!settings || !settings.standard) && <Box />}
          {year && metricType && <ChartYearSelect metricType={metricType} />}
        </Box>
      )}
    </Styled>
  );
}

ChartHeader.propTypes = {
  filters: PropTypes.object,
  settings: PropTypes.object,
  year: PropTypes.bool,
  metricType: PropTypes.string,
  // top: PropTypes.bool,
};

export default ChartHeader;
