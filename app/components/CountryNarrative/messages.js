/*
 * CountryNarrative Messages
 *
 * This contains all the text for the CountryNarrative component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.CountryNarrative';

export default defineMessages({
  vdem: {
    noData: {
      id: `${scope}.vdem.noData`,
      defaultMessage: 'No data',
    },
  },
  esr: {
    changeStandardNote: {
      id: `${scope}.esr.changeStandardNote`,
      defaultMessage:
        "Please note: data and commentary are shown for the '{otherStandard}' assessment standard. For {incomeCategory} countries it is best to use the '{defaultStandard}' standard instead. ",
    },
    noData: {
      id: `${scope}.esr.noData`,
      defaultMessage:
        'For {needsArticle, select, true {the } false { }}{country} a {dimension} score is not available due to missing data for at least one component of the rights to food, health, education, housing and work. Missing data tells us that {needsArticle, select, true {the } false { }}{country} has not submitted some information to the relevant international databases.',
    },
    dataOnlyForOtherStandard: {
      id: `${scope}.esr.dataOnlyForOtherStandard`,
      defaultMessage: 'dataOnlyForOtherStandard',
    },
    dataOnlyForRecommendedStandard: {
      id: `${scope}.esr.dataOnlyForRecommendedStandard`,
      defaultMessage: 'dataOnlyForRecommendedStandard',
    },
  },
  cpr: {
    noData: {
      id: `${scope}.cpr.noData`,
      defaultMessage: 'cpr.noData',
    },
    govRespondents: {
      id: `${scope}.cpr.govRespondents`,
      defaultMessage:
        'Note: For {countryWithArticle}, because it has a very small population, we allowed some survey respondents to work for or with the government. This was only allowed for countries with a population of fewer than 120,000 people, and excluded politicians, police, and members of the military. For more information, please see the Methodology Handbook.',
    },
  },
});
