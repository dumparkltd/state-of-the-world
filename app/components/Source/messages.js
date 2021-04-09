/*
 * Source Messages
 *
 * This contains all the text for the Source component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.Source';

export default defineMessages({
  sourceESR: {
    id: `${scope}.sourceESR`,
    defaultMessage: 'Sources: HRMI 2020 {linkRightsTracker} & {linkSERF}',
  },
  sourceCPR: {
    id: `${scope}.sourceCPR`,
    defaultMessage: 'Source: HRMI 2020 {linkRightsTracker}',
  },
});
