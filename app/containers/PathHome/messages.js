/*
 * Overview Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.PathHome';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'How is the state of Human Rights in the world?',
  },
  intro: {
    id: `${scope}.intro`,
    defaultMessage:
      'Explore how the world is doing for 5 Economic and Social Rights and 7 Civial and Political Rights according to the annual assessment of the Human Rights Measurement Initiative (HRMI, {linkRightsTracker})',
  },
  introESR: {
    id: `${scope}.introESR`,
    defaultMessage:
      'Country scores for the 5 Economic and Social Rights are based on the SERF index {linkSERF} that calculates country scores for two assessment standards using and aggregating a variety of national statistics. Note that data availability may differ for different UN regional groups and rights.',
  },
  introCPR: {
    id: `${scope}.introCPR`,
    defaultMessage:
      'Country scores for the 7 Civial and Political Rights are based on expert surveys conducted by HRMI among Human Rights experts for each country. Note that country coverage is still very limited and varies greatly between different UN regional groups.',
  },
});
