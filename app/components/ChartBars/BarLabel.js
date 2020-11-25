import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// prettier-ignore
const Styled = styled.span`
  text-align: left;
  padding: 2px 0 2px 0;
  line-height: 14px;
  min-height: 20px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ color, theme }) => color
    ? theme.global.colors[color]
    : theme.global.colors['dark-1']};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 2px 0 2px 0;
    min-height: 20px;
    line-height: 19px;
    font-size: 14px;
  }
  @media print {
    font-size: 15px;
    line-height: 20px;
  }
`;

function BarLabel({ label }) {
  return <Styled allowWordBreak>{label}</Styled>;
}

BarLabel.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default BarLabel;
