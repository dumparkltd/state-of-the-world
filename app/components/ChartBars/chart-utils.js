import { SIZES, BREAKPOINTS } from 'theme';

export const chartColumnWidth = (size, column) =>
  `${SIZES.charts[column][BREAKPOINTS[size].index]}px`;
