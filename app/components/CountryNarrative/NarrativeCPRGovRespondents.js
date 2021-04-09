import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';
import styled from 'styled-components';

import messages from './messages';

const StyledPara = styled(Paragraph)``;

function NarrativeCPRGovRespondents({ messageValues }) {
  return (
    <StyledPara margin={{ bottom: 'medium' }}>
      <FormattedMessage
        {...messages.cpr.govRespondents}
        values={messageValues}
      />
    </StyledPara>
  );
}

NarrativeCPRGovRespondents.propTypes = {
  messageValues: PropTypes.object,
};

export default NarrativeCPRGovRespondents;
