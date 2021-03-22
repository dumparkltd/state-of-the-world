import styled from 'styled-components';
import ButtonPlain from './ButtonPlain';
// prettier-ignore
export default styled(ButtonPlain)`
  display: block;
  text-align: center;
  padding: 0px 6px;
  font-size: ${({ theme }) => theme.text.small.size};
  font-weight: bold;
  color: ${({ theme, active }) => theme.global.colors[active ? 'world' : 'white']};
  background: ${({ theme, active }) => (active ? theme.global.colors['light-0'] : 'transparent')};
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  cursor: ${({ active }) => (active ? 'default' : 'pointer')} !important;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0px 10px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    font-size: ${({ theme }) => theme.text.medium.size};
    display: inline-block;
    height: 44px;
    padding: 0px 20px;
    width: auto;
  }
  &:hover {
    color: ${({ theme, active }) => theme.global.colors[active ? 'world' : 'white']};
    background: ${({ theme, active }) => (active ? theme.global.colors['light-0'] : 'transparent')};
    text-decoration: ${({ active }) => (active ? 'none' : 'underline')};
  }
  &:active {
    color: ${({ theme, active }) => theme.global.colors[active ? 'world' : 'white']};
    background: ${({ theme, active }) => (active ? theme.global.colors['light-0'] : 'transparent')};
  }
  &:visited {
    color: ${({ theme, active }) => theme.global.colors[active ? 'world' : 'white']};
    background: ${({ theme, active }) => (active ? theme.global.colors['light-0'] : 'transparent')};
  }
  &:focus {
    color: ${({ theme, active }) => theme.global.colors[active ? 'world' : 'white']};
    background: ${({ theme, active }) => (active ? theme.global.colors['light-0'] : 'transparent')};
    outline: none;
  }
`;
