import styled from 'styled-components';

// prettier-ignore
export default styled.div`
  position: relative;
  width: ${({ width }) => width || '100%'};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding-right: 10px;
    padding-left: 10px;
    margin-bottom: 20px;
  }
`;
