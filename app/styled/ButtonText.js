import styled from 'styled-components';
import ButtonPlain from './ButtonPlain';
// prettier-ignore
export default styled(ButtonPlain)`
  padding: 0;
  font-size: inherit;
  line-height: inherit;
  color: ${({ theme, inverse, color, hint }) => {
    if (hint) {
      return theme.global.colors.hint;
    }
    return theme.global.colors[color || (inverse ? 'white' : 'dark-3')];
  }};
  font-weight: 600;
  font-size: ${({ size, theme }) => theme.text[size || 'medium'].size};
  line-height: ${({ size, theme }) => theme.text[size || 'medium'].height};
  vertical-align: baseline;
  text-decoration: underline;
  text-align: left;
  &:hover{
    color: ${({ theme, inverse, color }) => theme.global.colors[color || (inverse ? 'white' : 'brand')]};
    background-color: transparent;
    text-decoration: underline;
    opacity: ${({ color }) => (color ? 0.8 : 1)};
  }
  &:active{
    color: ${({ theme, inverse, color }) => theme.global.colors[color || (inverse ? 'white' : 'dark-3')]};
    background-color: transparent;
  }
  &:visited{
    color: ${({ theme, inverse, color }) => theme.global.colors[color || (inverse ? 'white' : 'dark-3')]};
    background-color: transparent;
  }
  &:focus{
    color: ${({ theme, inverse, color }) => theme.global.colors[color || (inverse ? 'white' : 'dark-3')]};
    box-shadow: none;
    border-radius: 0;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0;
  }
`;
