import styled from 'styled-components';

// prettier-ignore
export default styled.div`
  position: relative;
  width: ${({ width }) => width || '100%'};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding-right: ${({ mode }) => {
    if (mode === 'detail') return '200px';
    return '10px';
  }};
    padding-left: 10px;
  }
`;
