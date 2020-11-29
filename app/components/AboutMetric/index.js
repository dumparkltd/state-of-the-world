/**
 *
 * AboutMetric
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import rootMessages from 'messages';
// import messages from './messages';
const StyledText = styled(Text)`
  font-size: 14px;
`;
function AboutMetric({ metric }) {
  return (
    <Box margin={{ top: 'medium' }}>
      <StyledText>
        <FormattedMessage {...rootMessages['rights-about'][metric.key]} />
      </StyledText>
    </Box>
  );
}

AboutMetric.propTypes = {
  metric: PropTypes.object,
};

export default AboutMetric;
