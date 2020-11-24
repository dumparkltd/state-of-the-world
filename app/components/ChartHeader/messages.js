/*
 * Overview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.ChartHeader';

export default defineMessages({
  'single-metric': {
    id: `${scope}.single-metric`,
    defaultMessage: 'Scores for {no} countries',
  },
  'countries-overview': {
    id: `${scope}.countries-overview`,
    defaultMessage: '{no} countries',
  },
  'countries-overview-sub': {
    id: `${scope}.countries-overview-sub`,
    defaultMessage: '{noWithout} countries without scores',
  },
  trend: {
    id: `${scope}.trend`,
    defaultMessage: 'Over time',
  },
  'assessment-standard-hi-sub': {
    id: `${scope}.assessment-standard-high-sub`,
    defaultMessage: 'Using the high income assessment standard',
  },
  'assessment-standard-core-sub': {
    id: `${scope}.assessment-standard-low-sub`,
    defaultMessage: 'Using the low and middle income assessment standard',
  },
});
