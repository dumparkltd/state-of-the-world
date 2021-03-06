/*
 * Overview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.ChartFilters';

export default defineMessages({
  addFilter: {
    id: `${scope}.addFilter`,
    defaultMessage: 'Add country filter',
  },
  addFilterMobile: {
    id: `${scope}.addFilterMobile`,
    defaultMessage: 'Add filter',
  },
  unregionFilterAll: {
    id: `${scope}.unregionFilterAll`,
    defaultMessage:
      "Filter countries by UN Group or select 'All' to compare UN Group averages",
  },
  unregionFilter: {
    id: `${scope}.unregionFilter`,
    defaultMessage: 'Filter countries by UN Group',
  },
  unregionHighlight: {
    id: `${scope}.unregionHighlight`,
    defaultMessage: 'Select UN Group',
  },
});
