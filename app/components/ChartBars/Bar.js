/**
 *
 * Bar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Wrapper from './styled/BarWrap';
import Score from './styled/Score';

const BarWrapper = styled.div``;

const BarReference = styled.div`
  position: relative;
  display: block;
  height: 16px;
  width: 100%;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: transparent;
`;
// prettier-ignore
const BarValue = styled.div`
  position: absolute;
  left: 0;
  top: -1px;
  height: 16px;
  background-color: ${props =>
    props.stripes ? 'transparent' : props.theme.global.colors[props.color]};
  opacity: ${props => props.active ? 0.8 : 1};
  ${props =>
    props.stripes &&
    css`
      background-image: linear-gradient(
        135deg,
        ${props.theme.global.colors[props.color]} 30%,
        ${props.theme.global.colors[`${props.color}Trans`]} 30%,
        ${props.theme.global.colors[`${props.color}Trans`]} 50%,
        ${props.theme.global.colors[props.color]} 50%,
        ${props.theme.global.colors[props.color]} 80%,
        ${props.theme.global.colors[`${props.color}Trans`]} 80%,
        ${props.theme.global.colors[`${props.color}Trans`]} 100%
      );
      background-size: 5px 5px;
      background-repeat: repeat;
    `}
`;

function Bar({
  data,
  showScore = false,
  maxValue,
  stripes = false,
  unit,
  color = 'world',
}) {
  const { value, title } = data;
  const hasValue = !!value || value === 0;
  // prettier-ignore
  return (
    <Wrapper responsive={false}>
      <BarWrapper>
        <BarReference>
          {hasValue && (
            <BarValue
              color={color || 'world'}
              style={{ width: `${(value / maxValue) * 100}%` }}
              stripes={stripes}
            />
          )}
        </BarReference>
        {showScore && hasValue && (
          <Score
            score={value}
            left={(value / maxValue) * 100}
            unit={unit}
            title={title}
          />
        )}
      </BarWrapper>
    </Wrapper>
  );
}

Bar.propTypes = {
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  showScore: PropTypes.bool,
  maxValue: PropTypes.number,
  stripes: PropTypes.bool,
  unit: PropTypes.string,
  color: PropTypes.string,
};

export default Bar;
