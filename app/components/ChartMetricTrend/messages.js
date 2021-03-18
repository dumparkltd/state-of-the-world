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
});
