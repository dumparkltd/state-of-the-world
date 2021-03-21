/*
 * CountryNarrative Messages
 *
 * This contains all the text for the CountryNarrative component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.ChartMetricTrend';

export default defineMessages({
  noteRatioLink: {
    id: `${scope}.noteRatioLink`,
    defaultMessage: '{count} of {total} countries',
  },
  noteAssessmentRatio: {
    id: `${scope}.noteAssessmentRatio`,
    defaultMessage: 'Based on {link} only and may thus not be representative. ',
  },
  noteAssessmentNoneWorld: {
    id: `${scope}.noteAssessmentNoneWorld`,
    defaultMessage: 'No countries were assessed in {year}',
  },
  noteAssessmentNoneRegion: {
    id: `${scope}.noteAssessmentNoneRegion`,
    defaultMessage:
      'No countries were assessed in {year} for the selected UN group',
  },
  noteAssessmentNoneRegionESR: {
    id: `${scope}.noteAssessmentNoneRegionESR`,
    defaultMessage:
      'No countries assessed for selected UN group and assessment standard',
  },
  noteAssessmentMultiple: {
    id: `${scope}.noteAssessmentMultiple`,
    defaultMessage:
      'UN group averages may not be representative due to missing country data',
  },
  noteCredibleIntervalRegions: {
    id: `${scope}.noteCredibleIntervalRegions`,
    defaultMessage: 'Average score with 80% credible interval ({link}) ',
  },
  noteCredibleIntervalLinkRegions: {
    id: `${scope}.noteCredibleIntervalLinkRegions`,
    defaultMessage: 'click for details',
  },
  noteCredibleIntervalCountry: {
    id: `${scope}.noteCredibleIntervalCountry`,
    defaultMessage: '80% credible interval ({link}) ',
  },
  noteCredibleIntervalLinkCountry: {
    id: `${scope}.noteCredibleIntervalLinkCountry`,
    defaultMessage: 'details',
  },
  noteUNRegionAverage: {
    id: `${scope}.noteRegionEverage`,
    defaultMessage: '{group} average',
  },
  infoESRintro: {
    id: `${scope}.infoESRintro`,
    defaultMessage: 'Average of all available country scores.',
  },
  infoESRadditional: {
    id: `${scope}.infoESRadditional`,
    defaultMessage:
      "Using HRMI's 'Global Best' benchmark where the maximum possible score (100%) is based on the best outcome achieved by any country regardless of available income",
  },
  infoCPRintro: {
    id: `${scope}.infoCPRintro`,
    defaultMessage: 'Average of all available country scores.',
  },
  infoCPRadditional: {
    id: `${scope}.infoCPRadditional`,
    defaultMessage:
      'Individual country scores are the median values of all expert responses for that country. The 80% credible intervals are based on the expert survey standard deviations.',
  },
});
