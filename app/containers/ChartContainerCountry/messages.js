/*
 * TabCountryReport Messages
 *
 * This contains all the text for the TabCountryReport component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.ChartContainerCountry';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage:
      'How well are Human Rights respected in {countryWithArticle}?',
  },
  exploreDetails: {
    id: `${scope}.exploreDetails`,
    defaultMessage: 'Explore Details',
  },
});
