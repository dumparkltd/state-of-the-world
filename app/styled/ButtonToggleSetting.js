import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';
import ButtonPrimary from './ButtonPrimary';

// prettier-ignore
const StyledPrimary = styled(ButtonPrimary)`
  border-radius: 0px !important;
  padding: 0px 4px;
  background-color: ${({ theme, color }) => theme.global.colors[color || 'light-3']};
  color: ${({ theme }) => theme.global.colors['dark-3']};
  border: 1px solid ${({ theme }) => theme.global.colors['light-4']};
  &:hover {
    background-color: ${({ theme, color }) => theme.global.colors[color || 'light-3']};
    color: ${({ theme }) => theme.global.colors['dark-3']};
}
  &:active {
    background-color: ${({ theme, color }) => theme.global.colors[color || 'light-3']};
    color: ${({ theme }) => theme.global.colors['dark-3']};
}
  &:focus {
    background-color: ${({ theme, color }) => theme.global.colors[color || 'light-3']};
    color: ${({ theme }) => theme.global.colors['dark-3']};
}
  &:visited {
    background-color: ${({ theme, color }) => theme.global.colors[color || 'light-3']};
    color: ${({ theme }) => theme.global.colors['dark-3']};
}
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0px 8px;
  }
`;
const StyledButton = styled(Button)`
  border-radius: 0px !important;
  border: 1px solid ${({ theme }) => theme.global.colors['light-4']};
  padding: 0px 4px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0px 8px;
  }
`;

function ButtonToggleSetting(props) {
  if (props.active) {
    return <StyledPrimary {...props} />;
  }
  return <StyledButton {...props} />;
}

ButtonToggleSetting.propTypes = {
  active: PropTypes.bool,
};

export default ButtonToggleSetting;
