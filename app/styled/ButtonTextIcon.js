import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'grommet';
import { FormNext } from 'grommet-icons';

// prettier-ignore
const Styled = styled(Button)`
  font-weight: ${({ weight }) => weight || 600};
  color: ${({ theme, color, hint }) => {
    if (hint) {
      return theme.global.colors.hint;
    }
    return theme.global.colors[color || 'dark-3'];
  }};
  font-size: ${({ theme, size }) => theme.text[size].size};
  padding: ${({ padding }) => padding || '0px'};
  border-radius: ${({ borderRadius }) => borderRadius || '18px'};
  text-decoration: underline;
  &:hover {
    color: ${({ theme, color }) => theme.global.colors[color || 'brand']};
    background-color: transparent;
    text-decoration: underline;
    opacity: ${({ color }) => (color ? 0.8 : 1)};
  }
`;

export function ButtonTextIcon({
  icon,
  hasIcon,
  label,
  secondary,
  size = 'medium',
  iconSize,
  reverse = true,
  gap,
  color,
  ...rest
}) {
  let iSize = iconSize;
  if (!iSize) {
    if (size === 'medium') iSize = 'large';
    if (size === 'large') iSize = 'xlarge';
  }
  return (
    <Styled
      label={label}
      a11Title={label}
      icon={
        icon || (hasIcon && <FormNext color={color || 'dark-3'} size={iSize} />)
      }
      plain
      reverse={reverse}
      gap={gap || (size !== 'medium' ? 'hair' : '0')}
      alignSelf="start"
      size={size}
      color={color}
      {...rest}
    />
  );
}

ButtonTextIcon.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.node,
  hasIcon: PropTypes.bool,
  secondary: PropTypes.bool,
  reverse: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  size: PropTypes.string,
  iconSize: PropTypes.string,
  gap: PropTypes.string,
  color: PropTypes.string,
};

export default ButtonTextIcon;
