import styled from 'styled-components';

// prettier-ignore
export default styled.div`
  position: relative;
  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding-right: ${({ mode }) => {
    if (mode === 'regions') return '200px';
    return '200px';
  }};
    padding-left: 10px;
    width: 100%;
  }
`;
