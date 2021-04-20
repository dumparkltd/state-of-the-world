/*
 * Source Messages
 *
 * This contains all the text for the Source component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.FAQs';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'FAQs',
  },
  methodology: {
    id: `${scope}.methodology`,
    defaultMessage: 'Learn more about the methodology',
  },
  methodologyUncertainty: {
    id: `${scope}.methodologyUncertainty`,
    defaultMessage: 'Learn more about the methodology',
  },
  methodologyUncertaintyURL: {
    id: `${scope}.methodologyUncertaintyURL`,
    defaultMessage: 'Learn more about the HRMI methodology',
  },
  questions: {
    measureRightESR: {
      id: `${scope}.questions.measureRightESR`,
      defaultMessage:
        'How does the HRMI methodology convert the above indicators into the {metric} metric?',
    },
    measureRightCPR: {
      id: `${scope}.questions.measureRightCPR`,
      defaultMessage: 'How has HRMI measured the {metric}?',
    },
    measureVDEM: {
      id: `${scope}.questions.measureVDEM`,
      defaultMessage: '?',
    },
    scale: {
      id: `${scope}.questions.scale`,
      defaultMessage: 'Why are the two types of metrics not on the same scale?',
    },
    standards: {
      id: `${scope}.questions.standards`,
      defaultMessage:
        'What is the difference between the two assessment standards?',
    },
    uncertainty: {
      id: `${scope}.questions.uncertainty`,
      defaultMessage: 'Why do some uncertainty bands go under 0 or above 10?',
    },
    year: {
      id: `${scope}.questions.year`,
      defaultMessage: 'Why are the two sets of metrics not for the same year?',
    },
  },
  answers: {
    measureRightESR: {
      id: `${scope}.answers.measureRightESR`,
      defaultMessage:
        'All HRMI measures of economic and social rights have been produced using official statistics collected by national governments and harmonised by international organisations. For each indicator, our methodology compares the observed level of enjoyment of that dimension of human rights to the enjoyment level it should be feasible for that country to achieve given its per-capita income level. HRMI economic and social rights metrics thus show how well the State is using its available resources to ensure that all people enjoy these rights.',
    },
    measureRightESRNotesIntro: {
      id: `${scope}.answers.measureRightESRNotesIntro`,
      defaultMessage:
        'Three things should be kept in mind when interpreting HRMI economic and social rights metrics',
    },
    measureRightESRNotesOne: {
      id: `${scope}.answers.measureRightESRNotesOne`,
      defaultMessage:
        'A score of 100% does NOT imply that everyone in the country enjoys the right. Rather, it implies that the country’s right enjoyment level is on par with the historically best-performing countries at the same per-capita income level.',
    },
    measureRightESRNotesTwo: {
      id: `${scope}.answers.measureRightESRNotesTwo`,
      defaultMessage:
        'A score of 100% does NOT mean there is no room for improvement. Countries with high HRMI scores still need to innovate to extend human rights enjoyment further than has been done in the past.',
    },
    measureRightESRNotesThree: {
      id: `${scope}.answers.measureRightESRNotesThree`,
      defaultMessage:
        'The fact that a high-income country earns a high HRMI score on a right does NOT imply that all population subgroups (e.g. women or indigenous people) in that country enjoy the right equally.',
    },
    measureRightCPR: {
      id: `${scope}.answers.measureRightCPR`,
      defaultMessage:
        'Each civil and political right metric has been produced from responses to a survey of in-country human rights experts. Respondents’ answers to questions about the frequency of violations of each civil and political right were combined using a statistical model that ensures the comparability of responses across countries. This results in a distribution of estimated levels of respect for each right in each country, represented by the scores and uncertainty bands shown throughout the data visualisations. Other information about who was identified as at risk for human rights abuse was also collected from our respondents, as shown.',
    },
    measureVDEM: {
      id: `${scope}.answers.measureVDEM`,
      defaultMessage: '!',
    },
    scale: {
      id: `${scope}.answers.scale`,
      defaultMessage:
        'HRMI metrics use two different methodologies that have different scales and interpretations. The scores for the civil and political rights metrics are a score out of 10 indicating the extent to which the government in the country respected that right. By contrast, the scores for the economic and social rights metrics are percentage scores. These tell you the percentage level of enjoyment achieved on that right relative to what should be feasible for a country with that income level. This is not the same as the extent to which people in the country enjoy the right',
    },
    uncertainty: {
      id: `${scope}.answers.uncertainty`,
      defaultMessage:
        'The short answer is that this sometimes happens when we convert our statistical calculations into scores from 0 to 10, and it doesn’t mean anything special.',
    },
    uncertaintyLong: {
      id: `${scope}.answers.uncertaintyLong`,
      defaultMessage: 'long answer',
    },
    year: {
      id: `${scope}.answers.year`,
      defaultMessage:
        'All metrics presented are the most recent data available. The civil and political rights metrics are for January to June 2017. The economic and social rights metrics are from the 2017 update of the International Social and Economic Rights Fulfilment Index, which covers the period from 2005 to 2015. The data used for each year are the most recently available data as of that year. HRMI graphs use the most recently available data from the full dataset.',
    },
  },
});
