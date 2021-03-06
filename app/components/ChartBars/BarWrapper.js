/**
 *
 * BarWrapper
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box, ResponsiveContext, Text } from 'grommet';
import { Ascending } from 'grommet-icons';

import { TYPES } from 'containers/App/constants';

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
const TrendWrap = styled.span`
  transform: rotate(${({ rotate = 0 }) => rotate}deg);
`;
// prettier-ignore
const ScoreWrap = styled(Box)`
`;
// border-right: 1px solid;
// border-color: ${({ theme, noBorder }) => noBorder ? 'transparent' : theme.global.colors['dark-3']};

export function BarWrapper({ score, type, intl, color }) {
  const [hover, setHover] = useState(false);
  const bullet = TYPES[type] && TYPES[type].uncertainty;
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <BarButton
          onClick={() => score.onClick && score.onClick()}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {(hover || score.active) && <Active color={color} />}
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
              pad={{
                left: 'small',
                right: !isMinSize(size, 'medium') ? 'small' : 'edge',
              }}
            >
              <Text
                size={isMinSize(size, 'medium') ? 'small' : 'xxsmall'}
                weight={600}
              >
                {score.value && formatScore(score.value, type, intl)}
                {!score.value &&
                  intl.formatMessage(rootMessages.labels.abbrev.notAvailable)}
              </Text>
            </ScoreWrap>
            {isMinSize(size, 'medium') && (
              <LabelWrap
                width={chartColumnWidth(size, 'trend')}
                align="center"
                flex={{ shrink: 0 }}
                pad={{ right: 'small' }}
              >
                {score.trend && score.trend === 'up' && (
                  <TrendWrap rotate={45}>
                    <Ascending size="large" />
                  </TrendWrap>
                )}
                {score.trend && score.trend !== 'up' && (
                  <TrendWrap rotate={135}>
                    <Ascending size="large" />
                  </TrendWrap>
                )}
              </LabelWrap>
            )}
            <BarWrap flex border="right">
              {!bullet && (
                <Bar
                  showScore={hover || score.active}
                  data={score}
                  color={color}
                  type={type}
                />
              )}
              {bullet && (
                <BarBullet
                  color={color}
                  data={score}
                  showScore={hover || score.active}
                  type={type}
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
  type: PropTypes.string,
  color: PropTypes.string,
  intl: intlShape,
};

export default injectIntl(BarWrapper);
