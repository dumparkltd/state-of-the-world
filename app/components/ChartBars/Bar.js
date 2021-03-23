/**
 *
 * Bar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Wrapper from './styled/BarWrap';
// import Score from './styled/Score';

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
  background-color: ${props => props.theme.global.colors[props.color]};
  opacity: ${props => props.active ? 0.8 : 1};
`;

function Bar({
  data,
  // showScore = false,
  maxValue,
  stripes = false,
  // unit,
  color = 'world',
}) {
  const { value } = data;
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
      </BarWrapper>
    </Wrapper>
  );
}
// {showScore && hasValue && (
//   <Score
//   score={value}
//   left={(value / maxValue) * 100}
//   unit={unit}
//   title={title}
//   />
// )}

Bar.propTypes = {
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  // showScore: PropTypes.bool,
  maxValue: PropTypes.number,
  stripes: PropTypes.bool,
  // unit: PropTypes.string,
  color: PropTypes.string,
};

export default Bar;
