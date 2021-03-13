import styled from 'styled-components';

// prettier-ignore

export default styled.div`
  background: white;
  position: relative;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  padding-top: 10px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding-right: ${({ padRight }) => (padRight ? 200 : 10)}px;
  }
`;
