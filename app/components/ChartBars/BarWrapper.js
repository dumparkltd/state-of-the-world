/**
 *
 * BarWrapper
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext, Text } from 'grommet';
import styled from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';

import Bar from 'components/ChartBars/Bar';
import BarBullet from 'components/ChartBars/BarBullet';

import { formatScore } from 'utils/scores';
import { isMinSize } from 'utils/responsive';

import rootMessages from 'messages';
import { chartColumnWidth } from './chart-utils';
import Active from './styled/Active';
import BarButton from './BarButton';
import BarLabel from './BarLabel';

const BarWrap = styled(Box)``;
// prettier-ignore
const LabelWrap = styled(Box)``;
// prettier-ignore
const ScoreWrap = styled(Box)`
`;
// border-right: 1px solid;
// border-color: ${({ theme, noBorder }) => noBorder ? 'transparent' : theme.global.colors.dark};

export function BarWrapper({ score, bullet, maxValue, unit, stripes, intl }) {
  const [hover, setHover] = useState(false);
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <BarButton
          onClick={() => score.onClick && score.onClick()}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {(hover || score.active) && <Active color={`${score.color}Active`} />}
          <Box key={score.key} direction="row" align="center">
            <LabelWrap
              width={chartColumnWidth(size, 'rank')}
              align="end"
              flex={{ shrink: 0 }}
              pad={{ right: 'small' }}
            >
              {score.rank && <BarLabel label={score.rank} />}
            </LabelWrap>
            <LabelWrap
              width={chartColumnWidth(size, 'label')}
              align="start"
              flex={{ shrink: 0 }}
              pad={{ right: 'small' }}
            >
              {score.label && <BarLabel label={score.label} />}
            </LabelWrap>
            <ScoreWrap
              width={chartColumnWidth(size, 'score')}
              align="start"
              flex={{ shrink: 0 }}
              pad={{ left: 'small' }}
            >
              <Text
                color={`${score.color}Dark`}
                size={isMinSize(size, 'medium') ? 'small' : 'xxsmall'}
                weight={600}
              >
                {score.value &&
                  `${formatScore(score.value, 1, intl)}${score.unit || ''}`}
                {!score.value &&
                  intl.formatMessage(rootMessages.labels.abbrev.notAvailable)}
              </Text>
            </ScoreWrap>
            <LabelWrap
              width={chartColumnWidth(size, 'trend')}
              align="center"
              flex={{ shrink: 0 }}
              pad={{ right: 'small' }}
            >
              {score.trend && <BarLabel label={score.trend} />}
            </LabelWrap>
            <BarWrap flex border="right">
              {!bullet && (
                <Bar
                  showScore={hover}
                  active={hover || score.active}
                  data={score}
                  maxValue={maxValue}
                  unit={unit}
                  stripes={stripes}
                />
              )}
              {bullet && (
                <BarBullet
                  data={score}
                  showScore={hover}
                  active={hover || score.active}
                  maxValue={maxValue}
                  unit={unit}
                  stripes={stripes}
                />
              )}
            </BarWrap>
          </Box>
        </BarButton>
      )}
    </ResponsiveContext.Consumer>
  );
}

BarWrapper.propTypes = {
  score: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  bullet: PropTypes.bool,
  maxValue: PropTypes.number,
  stripes: PropTypes.bool,
  unit: PropTypes.string,
  intl: intlShape,
};

export default injectIntl(BarWrapper);
