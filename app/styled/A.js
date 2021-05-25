import styled from 'styled-components';

export default styled.a`
  color: ${({ theme, hint }) =>
    hint ? theme.global.colors.hint : theme.global.colors.text.light};
  text-decoration: underline;
  font-weight: 600;
  &:hover {
    color: ${({ theme }) => theme.global.colors.brand};
  }
`;
