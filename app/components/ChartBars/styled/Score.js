import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import styled from 'styled-components';
import { formatScore } from 'utils/scores';
import { injectIntl, intlShape } from 'react-intl';

const Styled = styled.div`
  position: absolute;
  top: auto;
  bottom: 100%;
  font-weight: ${({ secondary }) => (secondary ? 400 : 700)};
  transform: ${({ align }) => {
    if (align === 'left') return '';
    if (align === 'right') return 'translateX(-100%)';
    return 'translateX(-50%)';
  }};
  transform-origin: bottom left;
  margin-top: auto;
  margin-bottom: 2px;
  margin-left: 0;
  display: table;
  width: auto;
`;

function Score({
  score,
  left,
  color,
  unit = '',
  level,
  secondary = false,
  align,
  title,
  intl,
}) {
  return (
    <Styled style={{ left: `${left}%` }} secondary={secondary} align={align}>
      <Box
        elevation="small"
        pad={{ horizontal: 'xsmall', vertical: 'hair' }}
        background="white"
        round="xxsmall"
      >
        {title && (
          <Text
            color={`${color}Dark`}
            size="small"
            style={{ fontWeight: score || level > 1 ? 400 : 600 }}
          >
            {title}
          </Text>
        )}
        {score && (
          <Text color={`${color}Dark`} size="small">
            {score && `${formatScore(score, 1, intl)}${unit}`}
          </Text>
        )}
      </Box>
    </Styled>
  );
}

Score.propTypes = {
  score: PropTypes.number,
  left: PropTypes.number,
  secondary: PropTypes.bool,
  color: PropTypes.string,
  unit: PropTypes.string,
  align: PropTypes.string,
  title: PropTypes.string,
  level: PropTypes.number,
  intl: intlShape.isRequired,
};

export default injectIntl(Score);
