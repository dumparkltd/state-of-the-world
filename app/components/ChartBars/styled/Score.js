import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import styled from 'styled-components';
import { formatScore } from 'utils/scores';
import { injectIntl, intlShape } from 'react-intl';

const Styled = styled.div`
  position: absolute;
  top: 0;
  font-weight: 400;
  transform: ${({ align }) => {
    if (align === 'right') return 'translateX(-100%)';
    return 'none';
  }};
  transform-origin: top left;
  margin-top: auto;
  margin-bottom: 2px;
  margin-left: 0;
  display: table;
  width: auto;
  text-shadow: ${({ theme }) => theme.global.outline};
`;

function Score({ score, left, color, type, align, intl }) {
  return (
    <Styled style={{ left: `${left}%` }} align={align}>
      <Box pad={{ horizontal: 'xsmall', vertical: 'hair' }}>
        <Text color={`${color}Dark`} size="xsmall">
          {score && formatScore(score, type, intl)}
        </Text>
      </Box>
    </Styled>
  );
}

Score.propTypes = {
  score: PropTypes.number,
  left: PropTypes.number,
  color: PropTypes.string,
  type: PropTypes.string,
  align: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(Score);
