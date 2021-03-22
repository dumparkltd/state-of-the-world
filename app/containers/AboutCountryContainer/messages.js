/*
 * AboutCountryContainer Messages
 *
 * This contains all the text for the AboutCountryContainer component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.AboutCountryContainer';

/* eslint-disable no-template-curly-in-string */
export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Country details',
  },
  population: {
    id: `${scope}.population`,
    defaultMessage: 'Population',
  },
  populationValue: {
    id: `${scope}.populationValue`,
    defaultMessage:
      '{value}{abbrev, select, millions {m} thousands {k} other {}} ({year})',
  },
  gdp: {
    id: `${scope}.gdp`,
    defaultMessage: 'GDP/capita',
  },
  gdpValue: {
    id: `${scope}.gdpValue`,
    defaultMessage: '${value}, {hint} ({year})',
  },
  gdpHint: {
    id: `${scope}.gdpHint`,
    defaultMessage: '(current US dollars)',
  },
  gdpTooltip: {
    id: `${scope}.gdpTooltip`,
    defaultMessage:
      'This is the latest value in USD. However, when comparing countries elsewhere on this website we use GDP/capita measured in 2011 PPP$, which adjusts for inflation and purchasing power',
  },
  gdpHintPPP: {
    id: `${scope}.gdpHintPPP`,
    defaultMessage: '(2011 PPP dollars)',
  },
  gdpTooltipPPP: {
    id: `${scope}.gdpTooltipPPP`,
    defaultMessage: 'About PPP dollars',
  },
  groups: {
    single: {
      id: `${scope}.groups.single`,
      defaultMessage: 'group',
    },
    plural: {
      id: `${scope}.groups.plural`,
      defaultMessage: 'groups',
    },
  },
  un_region: {
    id: `${scope}.un_region`,
    defaultMessage: 'UN Regional Group',
  },
  region: {
    id: `${scope}.region`,
    defaultMessage: 'Region',
  },
  subregion: {
    id: `${scope}.subregion`,
    defaultMessage: 'Subregion',
  },
  income: {
    id: `${scope}.income`,
    defaultMessage: 'Income group',
  },
  more: {
    id: `${scope}.more`,
    defaultMessage: 'Show country categories',
  },
  less: {
    id: `${scope}.less`,
    defaultMessage: 'Hide country categories',
  },
  countryLink: {
    id: `${scope}.countryLink`,
    defaultMessage: `${scope}.countryLink`,
  },
  countryStatus: {
    id: `${scope}.countryStatus`,
    defaultMessage: `${scope}.countryStatus`,
  },
  hrcMembershipCurrent: {
    id: `${scope}.hrcMembershipCurrent`,
    defaultMessage: 'Current HRC membership',
  },
  hrcMembershipCurrentSince: {
    id: `${scope}.hrcMembershipCurrentSince`,
    defaultMessage: 'Since {date}',
  },
  hrcMembershipsPrevious: {
    id: `${scope}.hrcMembershipsPrevious`,
    defaultMessage: 'Previous HRC memberships',
  },
  hrcInvite: {
    id: `${scope}.hrcInvite`,
    defaultMessage: 'Standing HRC invitation',
  },
  hrcInvite_true: {
    id: `${scope}.hrcInvite_true`,
    defaultMessage: 'Yes',
  },
  hrcInvite_false: {
    id: `${scope}.hrcInvite_false`,
    defaultMessage: 'No',
  },
  treaties: {
    id: `${scope}.treaties`,
    defaultMessage: 'Treaties ratified',
  },
  treaty_cat: {
    id: `${scope}.treaty_cat`,
    defaultMessage: 'CAT',
  },
  treaty_iccpr: {
    id: `${scope}.treaty_iccpr`,
    defaultMessage: 'ICCPR',
  },
  treaty_ced: {
    id: `${scope}.treaty_ced`,
    defaultMessage: 'CED',
  },
  treaty_cedaw: {
    id: `${scope}.treaty_cedaw`,
    defaultMessage: 'CEDAW',
  },
  treaty_cerd: {
    id: `${scope}.treaty_cerd`,
    defaultMessage: 'CERD',
  },
  treaty_icescr: {
    id: `${scope}.treaty_icescr`,
    defaultMessage: 'ICESCR',
  },
  treaty_crc: {
    id: `${scope}.treaty_crc`,
    defaultMessage: 'CRC',
  },
  treaty_crpd: {
    id: `${scope}.treaty_crpd`,
    defaultMessage: 'CRPD',
  },
  treaty_opcat: {
    id: `${scope}.treaty_opcat`,
    defaultMessage: 'OPCAT',
  },
  index_rsf: {
    id: `${scope}.index_rsf`,
    defaultMessage: 'Press Freedom Index (Reporters Without Borders)',
  },
  index_ti: {
    id: `${scope}.index_ti`,
    defaultMessage: 'Corruption Perception Index (Transparency International)',
  },
  index_eiu: {
    id: `${scope}.index_eiu`,
    defaultMessage: 'Democracy Index (Economist Intelligence Unit)',
  },
  dataUnavailable: {
    id: `${scope}.dataUnavailable`,
    defaultMessage: 'N/A',
  },
  upr_next: {
    id: `${scope}.upr_next`,
    defaultMessage: 'Next Universal Periocic Review',
  },
  upr_last: {
    id: `${scope}.upr_last`,
    defaultMessage: 'Last Universal Periocic Review',
  },
  yourhrc_profile: {
    id: `${scope}.yourhrc_profile`,
    defaultMessage: 'yourHRC.org country profile',
  },
  yourhrc_profile_url: {
    id: `${scope}.yourhrc_profile_url`,
    defaultMessage: 'https://yourhrc.org/country-detail/?country={code}',
  },
  has_npm: {
    id: `${scope}.has_npm`,
    defaultMessage: 'Has National Preventative Mechanism?',
  },
  has_npm_true: {
    id: `${scope}.has_npm_true`,
    defaultMessage: 'Yes',
  },
  has_npm_false: {
    id: `${scope}.has_npm_false`,
    defaultMessage: 'No',
  },
  visits_planned: {
    id: `${scope}.visits_planned`,
    defaultMessage: 'Number of visits planned',
  },
  visits_completed: {
    id: `${scope}.visits_completed`,
    defaultMessage: 'Number of visits completed',
  },
  sectionHR: {
    id: `${scope}.sectionHR`,
    defaultMessage: 'Country human rights information',
  },
  sectionIndices: {
    id: `${scope}.sectionIndices`,
    defaultMessage: 'Country scores for other indices',
  },
});
