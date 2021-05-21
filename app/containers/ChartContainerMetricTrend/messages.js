/*
 * ChartContainerMetricTrend Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.ChartContainerMetricTrend';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage:
      'How do the UN regional groups and their countries score for the {metric}?',
  },
});
