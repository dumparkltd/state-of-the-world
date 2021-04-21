/*
 * CountryNarrative Messages
 *
 * This contains all the text for the CountryNarrative component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.ChartBars';

export default defineMessages({
  infoESRintro: {
    id: `${scope}.infoESRintro`,
    defaultMessage:
      'Economic and social right scores have been produced from national statistics.',
  },
  infoESRadditional: {
    id: `${scope}.infoESRadditional`,
    defaultMessage:
      "Using HRMI's 'Global Best' benchmark, the maximum possible score (100%) is based on the best outcome achieved by any country.",
  },
  infoCPRintro: {
    id: `${scope}.infoCPRintro`,
    defaultMessage:
      'Civil and political right scores have been produced from expert survey responses. Scores closer to 10 are better.',
  },
  infoCPRadditional: {
    id: `${scope}.infoCPRadditional`,
    defaultMessage:
      'While shorter bars indicate more agreement of the different experts, longer bars indicate less agreement.',
  },
  infoVDEMintro: {
    id: `${scope}.infoVDEMintro`,
    defaultMessage:
      'Civil and political right scores have been produced from expert survey responses. Scores closer to 10 are better.',
  },
  infoVDEMadditional: {
    id: `${scope}.infoVDEMadditional`,
    defaultMessage:
      'While shorter bars indicate more agreement of the different experts, longer bars indicate less agreement.',
  },
});
