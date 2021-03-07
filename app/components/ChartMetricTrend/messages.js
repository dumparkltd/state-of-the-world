/*
 * CountryNarrative Messages
 *
 * This contains all the text for the CountryNarrative component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.components.ChartMetricTrend';

export default defineMessages({
  noteAssessmentRatioWorld: {
    id: `${scope}.noteAssessmentRatioWorld`,
    defaultMessage:
      'Note: for {year} the global average is only based on an assessment of {count} out of {total} countries and may thus not be representative',
  },
  noteAssessmentRatioRegion: {
    id: `${scope}.noteAssessmentRatioRegion`,
    defaultMessage:
      'Note: for {year} the regional average is only based on an assessment of {count} out of {total} countries in that region and may thus not be representative',
  },
  noteAssessmentNoneWorld: {
    id: `${scope}.noteAssessmentNoneWorld`,
    defaultMessage: 'Note: for {year} no countries were assessed',
  },
  noteAssessmentNoneRegion: {
    id: `${scope}.noteAssessmentNoneRegion`,
    defaultMessage:
      'Note: for {year} no countries were assessed in that region',
  },
  noteAssessmentNoneRegionESR: {
    id: `${scope}.noteAssessmentNoneRegionESR`,
    defaultMessage:
      'Note: for {year} no countries were assessed in that region and for selected assessment standard',
  },
  noteAssessmentMultiple: {
    id: `${scope}.noteAssessmentMultiple`,
    defaultMessage:
      'Note: regional averages may not be representative due to missing country data',
  },
});
