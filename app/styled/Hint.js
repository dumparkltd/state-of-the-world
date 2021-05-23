import styled from 'styled-components';

export default styled.div`
  color: ${({ theme }) => theme.global.colors.hint};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 2px;
`;
