import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';
import Hint from 'styled/Hint';

import messages from './messages';

function NarrativeCPRGovRespondents({ messageValues }) {
  return (
    <Paragraph margin={{ bottom: 'medium', top: '0' }}>
      <Hint size="xsmall">
        <FormattedMessage
          {...messages.cpr.govRespondents}
          values={messageValues}
        />
      </Hint>
    </Paragraph>
  );
}

NarrativeCPRGovRespondents.propTypes = {
  messageValues: PropTypes.object,
};

export default NarrativeCPRGovRespondents;
