import styled from 'styled-components';
import Button from './Button';
// prettier-ignore
export default styled(Button)`
  color: ${({ theme }) => theme.global.colors.white};
  background-color: transparent;
  border-radius: 100%;
  width: 36px;
  height: 36px;
  text-align: center;
  padding: ${({ small }) => (small ? 2 : 0)}px;
  box-shadow: ${({ float }) => float ? '0 0 3px 1px rgba(0, 0, 0, 0.15)' : ''};
  &:hover{
    color: ${({ theme }) => theme.global.colors.white};
    background-color: transparent;
    opacity: 0.8;
  }
  &:active{
    color: ${({ theme }) => theme.global.colors.white};
    background-color: transparent;
  }
  &:visited{
    color: ${({ theme }) => theme.global.colors.white};
    background-color: ${({ theme }) => theme.global.colors['dark-3']};
  }
  &:focus{
    color: ${({ theme }) => theme.global.colors.white};
    background-color: transparent;
    box-shadow: none;
    border-radius: 100%;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: ${({ small }) => (small ? 2 : 0)}px;
  }
`;
