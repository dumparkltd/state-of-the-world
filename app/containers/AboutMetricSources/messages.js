/*
 * CountryAbout Messages
 *
 * This contains all the text for the CountryAbout component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.AboutMetricSources';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Statistical indicator(s)',
  },
  intro: {
    id: `${scope}.intro`,
    defaultMessage:
      "Learn more about the underlying statistical indicator(s) for the '{standard}' assessment standard",
  },
  titleSourceShort: {
    id: `${scope}.titleSourceShort`,
    defaultMessage: 'Source(s)',
  },
});
