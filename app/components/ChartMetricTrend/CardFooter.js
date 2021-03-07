/**
 *
 * ChartMetricTrend
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Text } from 'grommet';

import { getRegionYearCount } from 'utils/charts';

import Hint from 'styled/Hint';

import messages from './messages';

const Styled = styled.div`
  margin-top: 5px;
`;
function CardFooter({
  regionScores,
  unRegionFilterValue,
  year,
  column,
  regionTotals,
  isESR,
}) {
  if (!regionScores) return null;
  console.log(unRegionFilterValue);
  console.log(regionTotals);
  console.log(regionScores);
  const total = regionTotals[unRegionFilterValue];

  const count =
    unRegionFilterValue &&
    getRegionYearCount(year, regionScores[unRegionFilterValue][column]);

  if (unRegionFilterValue && count === total) return null;
  const values = {
    year: <strong>{year}</strong>,
    count: <strong>{count}</strong>,
    total: <strong>{total}</strong>,
  };
  return (
    <Styled>
      {!unRegionFilterValue && (
        <Hint>
          <Text size="xxsmall">
            <FormattedMessage {...messages.noteAssessmentMultiple} />
          </Text>
        </Hint>
      )}
      {unRegionFilterValue && (
        <Hint>
          {count > 0 && (
            <Text size="xxsmall">
              {unRegionFilterValue === 'world' && (
                <FormattedMessage
                  {...messages.noteAssessmentRatioWorld}
                  values={values}
                />
              )}
              {unRegionFilterValue !== 'world' && (
                <FormattedMessage
                  {...messages.noteAssessmentRatioRegion}
                  values={values}
                />
              )}
            </Text>
          )}
          {count === 0 && (
            <Text size="xxsmall">
              {unRegionFilterValue === 'world' && (
                <FormattedMessage
                  {...messages.noteAssessmentNoneWorld}
                  values={values}
                />
              )}
              {unRegionFilterValue !== 'world' && !isESR && (
                <FormattedMessage
                  {...messages.noteAssessmentNoneRegion}
                  values={values}
                />
              )}
              {unRegionFilterValue !== 'world' && isESR && (
                <FormattedMessage
                  {...messages.noteAssessmentNoneRegionESR}
                  values={values}
                />
              )}
            </Text>
          )}
        </Hint>
      )}
    </Styled>
  );
}

CardFooter.propTypes = {
  unRegionFilterValue: PropTypes.string,
  column: PropTypes.string,
  regionScores: PropTypes.object,
  regionTotals: PropTypes.object,
  year: PropTypes.string,
  isESR: PropTypes.bool,
};

export default CardFooter;
