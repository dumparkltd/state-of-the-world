import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.CountryNotes';

export default defineMessages({
  trendESRNote: {
    id: `${scope}.trendESRNote`,
    defaultMessage:
      '* Change from previous year. Lack of indicated change may also be due to lack of data for the current year.',
  },
  trendCPRNote: {
    id: `${scope}.trendCPRNote`,
    defaultMessage:
      '* Change of median score from previous year. Due to the inherent uncertainty, changes are only indicated when exceeding a threshold of {threshold}.',
  },
  hiNote: {
    id: `${scope}.hiNote`,
    defaultMessage:
      '{hiLabel} High income country. For these countries it is best to use the high income assessment standard.',
  },
  govResponseNote: {
    id: `${scope}.govResponseNote`,
    defaultMessage:
      '{govRespLabel} Some survey respondents in the smallest countries worked for or with the government (only allowed for countries with a population of fewer than 120,000 people)',
  },
});
