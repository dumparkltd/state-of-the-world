import styled from 'styled-components';
import ButtonPlain from './ButtonPlain';
// prettier-ignore
export default styled(ButtonPlain)`
  display: block;
  color: ${({ theme }) => theme.global.colors['dark-3']};
  padding: 10px 20px;
  font-size: 1em;
  text-align: left;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    text-align: center;
    color: ${({ theme, active }) => theme.global.colors[active ? 'brandDark' : 'dark-3' ]};
    padding: 0px 10px;
    display: inline-block;
    border: none;
    width: auto;
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
    &:visited {
      color: ${({ theme }) => theme.global.colors['dark-3']};
    }
    &:hover {
      color: ${({ theme }) => theme.global.colors.brandDark};
    }
  }
`;
