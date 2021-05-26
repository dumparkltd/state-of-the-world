import styled from 'styled-components';

// prettier-ignore
export default styled.div`
  position: relative;
  width: ${({ width }) => width || '100%'};
  max-width: 400px;
  margin-bottom: ${({ theme }) => theme.global.edgeSize.small};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-right: ${({ theme }) => theme.global.edgeSize.xsmall};
    padding-left: ${({ theme }) => theme.global.edgeSize.xsmall};
    margin-bottom: ${({ theme }) => theme.global.edgeSize.ms};
  }
`;
