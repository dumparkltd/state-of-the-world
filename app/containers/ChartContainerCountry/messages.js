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
  rightsTrackerCountryURL: {
    id: `${scope}.rightsTrackerCountryURL`,
    defaultMessage:
      '{url}/en/country/{countryCode}?as={standard}&tab=report-esr',
  },
  seeRightsTracker: {
    id: `${scope}.seeRightsTracker`,
    defaultMessage:
      'View Rights Tracker for underlying statistical indicator country scores and raw data',
  },
});
