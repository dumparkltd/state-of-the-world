import styled from 'styled-components';
import Button from './Button';

// Large prominent Button designed to work on dark background

// prettier-ignore
export default styled(Button)`
  color: white;
  background-color: ${({ theme }) => theme.global.colors.brand};
  border-radius: 5px;
  margin: 20px 0;
  font-size: ${({ theme }) => theme.text.small.size};
  padding: 10px 20px;
  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.global.colors.buttonPrimaryHover};
}
&:active {
  border-radius: 5px;
}
&:visited {
  border-radius: 5px;
}
&:focus {
  border-radius: 5px;
}
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin: 40px 0;
    font-size: ${({ theme }) => theme.text.medium.size};
    padding: 10px 20px;
  }
`;
