/**
 *
 * ChartHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ChartFilters from 'containers/ChartFilters';
import ChartSettings from 'containers/ChartSettings';

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

export function ChartHeader({ filters, settings }) {
  return (
    <Styled top>
      {filters && <ChartFilters filters={filters} />}
      {settings && settings.standard && <ChartSettings showStandard />}
    </Styled>
  );
}

ChartHeader.propTypes = {
  filters: PropTypes.object,
  settings: PropTypes.object,
  // top: PropTypes.bool,
};

export default ChartHeader;
