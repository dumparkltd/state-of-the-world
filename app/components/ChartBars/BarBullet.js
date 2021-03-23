/**
 *
 * BarBullet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Wrapper from './styled/BarWrap';
import Score from './styled/Score';

const BarWrapper = styled.div``;

// level:
const MARK_WIDTH = [4, 4, 3, 3];

const BarAnchor = styled.div`
  position: relative;
  display: block;
  height: 20px;
  width: 100%;
  background-color: transparent;
`;
const BarReference = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -1px;
  width: 100%;
  height: 1px;
  background-color: ${({ theme, color }) =>
    theme.global.colors[color || 'dark']};
  opacity: 0.33;
`;

const MarkValue = styled.div`
  position: absolute;
  top: 0;
  height: 20px;
  width: 0;
  margin-left: -${props => MARK_WIDTH[props.level || 1] / 2}px;
  border-right: ${props => MARK_WIDTH[props.level || 1]}px solid;
  border-color: ${props => props.theme.global.colors[props.color]};
`;
const MarkBound = styled(MarkValue)`
  top: 3px;
  margin-left: -0.5px;
  border-right-width: 1px;
  height: 14px;
`;

const BarBand = styled.div`
  position: absolute;
  top: 3px;
  height: 14px;
  background-color: ${props => props.theme.global.colors[props.color]};
  opacity: ${({ active }) => {
    if (active) return 0.5;
    return 0.35;
  }};
`;

function BarBullet({ color, data, showScore, active, maxValue }) {
  const { value, band } = data;

  return (
    <Wrapper>
      <BarWrapper>
        <BarAnchor>
          {value && <BarReference />}
          {value && (
            <BarBand
              color={color || 'world'}
              active={active}
              lo={(band.lo / maxValue) * 100}
              hi={(band.hi / maxValue) * 100}
              style={{
                left: `${(band.lo / maxValue) * 100}%`,
                width: `${(band.hi / maxValue) * 100 -
                  (band.lo / maxValue) * 100}%`,
              }}
            />
          )}
          {value && (
            <MarkValue
              color={color || 'world'}
              style={{ left: `${(value / maxValue) * 100}%` }}
            />
          )}
          {value && (
            <MarkBound
              color={color || 'world'}
              style={{ left: `${(band.lo / maxValue) * 100}%` }}
            />
          )}
          {value && (
            <MarkBound
              color={color || 'world'}
              style={{ left: `${(band.hi / maxValue) * 100}%` }}
            />
          )}
          {band.lo && showScore && (
            <Score
              score={band.lo}
              left={(band.lo / maxValue) * 100}
              color={color}
              secondary
              align="right"
            />
          )}
          {band.hi && showScore && (
            <Score
              score={band.hi}
              left={(band.hi / maxValue) * 100}
              secondary
              align="left"
            />
          )}
        </BarAnchor>
      </BarWrapper>
    </Wrapper>
  );
}

BarBullet.propTypes = {
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  showScore: PropTypes.bool,
  active: PropTypes.bool,
  maxValue: PropTypes.number,
  color: PropTypes.string,
};

export default BarBullet;
