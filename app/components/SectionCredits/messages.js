/*
 * Sections Messages
 *
 * This contains all the text for the Overview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.SectionCredits';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Acknowledgements',
  },
  main: {
    id: `${scope}.main`,
    defaultMessage: 'Brought to you by',
  },
  data: {
    id: `${scope}.data`,
    defaultMessage: 'Powered by',
  },
  development: {
    id: `${scope}.development`,
    defaultMessage: 'Design & development by',
  },
  funding: {
    id: `${scope}.funding`,
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
  link_vdem: {
    id: `${scope}.link_vdem`,
    defaultMessage: '//www.v-dem.net',
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
  link_vdem_title: {
    id: `${scope}.link_vdem_title`,
    defaultMessage: 'V-Dem Institute',
  },
  link_serf_title: {
    id: `${scope}.link_serf_title`,
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
    defaultMessage: 'Permanent Mission of Denmark to UN Geneva',
  },
});
