import styled, { css } from 'styled-components';

// prettier-ignore
export default styled.div`
  position: ${({ above }) => (above ? 'relative' : 'absolute')};
  ${({ above, relative, horizontal }) => {
    if (horizontal) return css`
      bottom: 3px;
      left: -15px;
      width: auto;
      white-space: nowrap;
    `;
    if (relative) return css`
      bottom: 2px;
      width: auto;
      white-space: nowrap;
    `;
    return above
      ? css`
        bottom: -1px;
        right: -1px;
      `
      : css`
        min-width: 70px;
        top: 14px;
        left: -1px;
        text-align: left;
        display: table;
      `;
  }}
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme }) => theme.global.colors['dark-3']};
`;
