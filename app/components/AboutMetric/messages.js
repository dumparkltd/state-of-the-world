/*
 * AboutMetric Messages
 *
 * This contains all the text for the AboutMetric component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.AboutMetric';

/* eslint-disable no-template-curly-in-string */
export default defineMessages({
  title: {
    rights: {
      id: `${scope}.title.rights`,
      defaultMessage: 'How is this human right defined?',
    },
  },
  titleStandards: {
    id: `${scope}.titleStandards`,
    defaultMessage: 'What assessment standard is it used for?',
  },
  titleSource: {
    id: `${scope}.titleSource`,
    defaultMessage: 'Data source(s)',
  },
  titleSourcesByIndicator: {
    id: `${scope}.titleSourcesByIndicator`,
    defaultMessage: 'Data sources by indicator',
  },
});
