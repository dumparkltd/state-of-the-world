/*
 * Sections Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.SectionCredits';

export default defineMessages({
  credits_title: {
    id: `${scope}.credits_title`,
    defaultMessage: 'Acknowledgements',
  },
  credit_main: {
    id: `${scope}.credit_main`,
    defaultMessage: 'Brought to you by',
  },
  credit_data: {
    id: `${scope}.credit_data`,
    defaultMessage: 'Powered by',
  },
  credit_development: {
    id: `${scope}.credit_development`,
    defaultMessage: 'Design & development by',
  },
  credit_funding: {
    id: `${scope}.credit_development`,
    defaultMessage: 'Supported by',
  },
  link_urg: {
    id: `${scope}.link_urg`,
    defaultMessage: '//universal-rights.org',
  },
  link_hrmi: {
    id: `${scope}.link_hrmi`,
    defaultMessage: '//rightstracker.org',
  },
  link_serf: {
    id: `${scope}.link_serf`,
    defaultMessage: 'http://serfindex.org',
  },
  link_dumpark: {
    id: `${scope}.link_dumpark`,
    defaultMessage: '//dumpark.com',
  },
  link_norway: {
    id: `${scope}.link_norway`,
    defaultMessage: '//www.regjeringen.no/en/dep/ud/id833/',
  },
  link_denmark: {
    id: `${scope}.link_denmark`,
    defaultMessage: '//fngeneve.um.dk/en/',
  },
  link_urg_title: {
    id: `${scope}.link_urg_title`,
    defaultMessage: 'Universal Rights Group',
  },
  link_hrmi_title: {
    id: `${scope}.link_hrmi_title`,
    defaultMessage: 'HRMI Rights Tracker',
  },
  link_serf_title: {
    id: `${scope}.link_serf`,
    defaultMessage: 'SERF Index',
  },
  link_dumpark_title: {
    id: `${scope}.link_dumpark_title`,
    defaultMessage: 'Dumpark Information Design',
  },
  link_norway_title: {
    id: `${scope}.link_norway_title`,
    defaultMessage: 'Norwegian Ministry of Foreign Affairs',
  },
  link_denmark_title: {
    id: `${scope}.link_denmark_title`,
    defaultMessage: 'Permanent Missionof Denmark to UN Geneva',
  },
});
