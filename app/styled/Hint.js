import styled from 'styled-components';

export default styled.div`
  color: ${({ theme }) => theme.global.colors.hint};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
  font-size: ${({ size, theme }) => theme.text[size || 'small'].size};
  line-height: ${({ size, theme }) => theme.text[size || 'small'].height};
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`;
